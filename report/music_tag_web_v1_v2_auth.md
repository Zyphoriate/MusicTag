# xhongc/music_tag_web:latest 逆向分析：V1/V2 鉴权到底怎么鉴

> 目标镜像：`xhongc/music_tag_web:latest`（amd64）
> 镜像索引 digest：`sha256:4682a379f3b420afcbe0439ae2a78b2641748a96df60b9cfbec9600c804885fe`
> amd64 manifest：`sha256:b039ae9efc72f39f19396bef7c3ae54e5a282bc9ec7d77e43d683304d9353211`
> 应用版本：`APP_VERSION=2.8.2`，`APP_BUILD=ff55c35fc908a79a87d838090f09ca9a26fd9e88`，`APP_CHANNEL=docker`
> 应用代码：Cython 3.1.2 编译的 Python 3.11 `.so`；前端 Vue 构建产物带 `.js.map`（可直接还原前端源码）

镜像元数据见 [`artifacts/image.txt`](../artifacts/image.txt)。

## 0. 一句话结论

这个镜像里的 **V1/V2 不是两套登录协议，也不是 `/api/v1`、`/api/v2` 两版 API**，而是**实例的授权等级**：

- **V1 = 未激活/免费受限实例**：用户仍然用 JWT 登录，但 `IamPermission` 只放行 `V1_VIEW_LIST` 里的少量接口；其他接口（包括删除、后台任务、音乐库管理等）一律 403，**连 superuser 也不豁免**。
- **V2 = 已激活/永久授权实例**：只要用户已登录，`IamPermission` 基本全放行。
- 授权状态由 `SysSettings` 的 `raw_code` / `code` / `license_blob` / `license_schema` 决定。V2 使用 **RSA-PKCS1v15-SHA256 签名的 license blob 本地离线校验**；V1/旧版走 **IAM `/iam/code/verify/` 在线校验**（HMAC-SHA256 签名 + 时间戳）。
- 另外还有一套独立的 **`access_token`**（`Authorization: <token>` 或 `Bearer <token>`），用于 `/apigw/*` 和 `/mcp/`，和 V1/V2 角色无关。

---

## 1. 镜像与方法

### 1.1 取镜像

没有可用的 Docker daemon（`/var/run/docker.sock` 无权限），直接走 Docker Registry HTTP API 拉 manifest / config / layers，再用 Python 处理 whiteout 解包。脚本见：

- [`artifacts/backend/extract_image.sh`](../artifacts/backend/extract_image.sh)

镜像 config 关键信息：

```text
APP_VERSION=2.8.2
APP_CHANNEL=docker
APP_BUILD=ff55c35fc908a79a87d838090f09ca9a26fd9e88
TZ=Asia/Shanghai
PUID=0 PGID=0
EXPOSE 8002
```

Dockerfile history 显示：`python:3.11.18` + `pip install` 预编译 wheels + `COPY /app /app` + supervisor + nginx；应用代码是 `.so`，但：

- 前端 `static/dist/js/*.js.map` 带 `sourcesContent`，可完整还原 Vue 源码；
- 后端 `.so` 里保留了 Cython 函数名、Python 字符串常量、行号（异常 traceback 能看到 `applications/user/utils.py line 51/309` 等），可以静态 + 动态还原逻辑；
- 镜像里只有 **公钥** `license/license_public_key.pem`，没有私钥。

### 1.2 关键文件

| 路径（镜像内） | 作用 |
|---|---|
| `/app/django_vue_cli/settings.so` | Django settings：REST_FRAMEWORK、SIMPLE_JWT、中间件、SECRET_KEY |
| `/app/applications/user/utils.so` | 授权/许可证核心：`get_runtime_license_state`、`verify_code`、`is_v2_license_request`、`genre_sign`、`get_request_role` |
| `/app/applications/user/license_crypto.so` | V2 license blob 的 RSA 验签 |
| `/app/applications/permission/utils.so` | `LisenseCodeMiddlewarePro`、`IamPermission`、`AccessTokenPermission` |
| `/app/applications/user/views.so` | `/apimt/token/` 登录、`/user/active/` 激活、`/user/info/` |
| `/app/applications/mcp/rpc.so` | MCP `_check_auth`（Bearer access_token） |
| `/app/static/dist/js/index.*.js(.map)` | 前端 axios 拦截器、登录、激活弹窗 |
| `/app/license/license_public_key.pem` | V2 license 验签公钥（RSA-2048） |

---

## 2. 先澄清：没有 `/api/v1`、`/api/v2`

把 Django URLconf 完整 dump 后，认证/授权相关路由是：

```text
/apimt/token/                 -> applications.user.views.CodeObtainJSONWebToken   # 登录发 JWT
/apimt/*                      -> 业务 API（TaskViewSets 等）
/user/*                       -> 用户 API（UserViewSets）
/api/*                        -> Navidrome 兼容 API
/rest/*                       -> Subsonic 兼容 API
/apigw/*                      -> 小爱网关（AccessTokenPermission）
/mcp/                         -> MCP（Bearer access_token）
/auth/oidc/login|callback     -> OIDC
/auth/social/<provider>/...   -> 社交登录
```

没有 `/api/v1`、`/api/v2` 或 `X-API-Version` 之类的版本路由。V1/V2 是 `applications.permission.constans.V1_VIEW_LIST`、`get_runtime_license_state()` 返回的 `role`、`/user/info/` 返回的 `role` 以及前端“激活V2版本”弹窗里的那个 V1/V2。

证据：[`artifacts/backend/settings_and_routes.txt`](../artifacts/backend/settings_and_routes.txt)

---

## 3. 登录鉴权：JWT（所有用户都先过这一层）

### 3.1 登录接口

```http
POST /apimt/token/
Content-Type: application/json

{"username":"normal","password":"pw123456"}
```

成功响应（实测）：

```json
{"token":"<JWT>","user":{"id":2,"username":"normal"},"result":true}
```

失败：

```json
{"result":false,"msg":"用户名或密码错误"}
```

JWT 是 `rest_framework_simplejwt` 的 access token：

```json
// header
{"alg":"HS256","typ":"JWT"}
// payload
{"token_type":"access","exp":1795953844,"iat":1795349044,
 "jti":"0764ada785754815a391f5850c85d0b6","user_id":"2"}
```

- `ACCESS_TOKEN_LIFETIME = 7 days`（`SIMPLE_JWT`）
- `AUTH_HEADER_TYPES = ('JWT', 'jwt')`，所以请求头必须是 `Authorization: JWT <token>`，不是常见的 `Bearer`
- 服务端登录响应本身**不 Set-Cookie**（实测 `cookies: {}`）；是前端把 token 写进 cookie：

```js
// src/views/user/login.vue
this.setCookie('AUTHORIZATION', 'JWT ' + res.token, 7)
```

- axios 每次请求把 cookie 原样放进 header，并附带 CSRF token：

```js
// src/api/axiosconfig/axiosconfig.js
config.headers['X-Requested-With'] = 'XMLHttpRequest'
config.headers['Authorization'] = self.getCookie('AUTHORIZATION')
const name = window.CSRF_COOKIE_NAME || 'django_vue_cli_csrftoken'
config.headers['X-CSRFToken'] = self.getCookie(name) || 'NOTPROVIDED'
axios.defaults.withCredentials = true
```

Django 侧：

```python
REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': ['rest_framework_simplejwt.authentication.JWTAuthentication'],
  'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticated',),
  ...
}
SIMPLE_JWT = {'ACCESS_TOKEN_LIFETIME': timedelta(days=7),
              'AUTH_HEADER_TYPES': ('JWT', 'jwt')}
CSRF_COOKIE_NAME = 'django_vue_cli_csrftoken'
CSRF_TRUST_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
```

### 3.2 登录后的用户信息

```http
GET /user/info/
Authorization: JWT <token>
```

返回：

```json
{"result":true,"code":"200","data":{
  "username":"normal","display_name":"normal","is_superuser":false,
  "salt":"VgUhds74","hash":"f0d30f8a27bd9e029478c66433917170",
  "role":"V1", "is_forever":false, "locale":"zh-CN",
  "sys_dict":{...}
},"message":"success"}
```

`role` / `is_forever` 就是实例授权等级，不是用户角色。V1 时 `is_forever=false`。

证据：[`artifacts/backend/login_jwt.txt`](../artifacts/backend/login_jwt.txt)

---

## 4. V1/V2 判定链（核心）

### 4.1 状态存在 `SysSettings` 表

`applications.task.models.SysSettings` 是一个 `key/value` 表，授权相关 key：

| key | 含义 |
|---|---|
| `raw_code` | 机器/激活码；系统信息页“激活码”复制的是它 |
| `code` | 旧版/授权 code（运行时 seed 的 fallback） |
| `license_blob` | V2 签名许可证 blob |
| `license_schema` | 固定 `signed_v1` |
| `license_last_verify_at` | 上次校验时间（清理时一起清） |
| `access_token` | 另一套 API token（见第 6 节） |

### 4.2 `get_runtime_license_state()` 的实际执行链

通过运行时 hook 所有模块函数，实测调用顺序：

```text
get_runtime_license_state(force_refresh=True)
  ├─ 读 SysSettings: raw_code, code, license_blob
  ├─ seed = _license_runtime_seed(raw_code, code, license_blob)
  │    优先级：license_blob > raw_code > code > 'empty'
  ├─ cache_key = _license_cache_key(seed)
  │    = 'license:runtime:' + sha256(seed).hexdigest()
  ├─ if seed == 'empty': return {'role':'V1','validated':False,'message':'empty'}
  ├─ if seed 是 signed license blob:
  │    _validate_local_signed_license(seed)
  │      -> (True, '验证通过', payload)
  │    _build_runtime_v2_state('验证通过', now, payload)
  │      -> {'role':'V2','validated':True,'message':'验证通过',
  │          'recheck_at': now+1800,
  │          'grace_expires_at': payload['expires_at'],
  │          'license_payload': payload, 'expires_at': payload['expires_at']}
  └─ else（旧 code / raw_code）:
       verify_code(seed, mode='runtime', fail_open=False)
         -> POST http://47.106.155.6:7999/iam/code/verify/
         -> 要求响应 data.license_blob + data.license_schema
         -> 再走本地 RSA 校验；失败则 _clear_runtime_license(clear_raw=True) 并返回 V1
```

- 缓存：`recheck_at = now + 1800`（30 分钟）；`LICENSE_GRACE_SECONDS = 86400`（24 小时宽限常量）。
- 角色缓存/派生：`get_runtime_role()`、`get_request_role(request)`、`is_v2_license_request(request)` 都最终看这个 state 的 `role`；V2 时 `is_v2_license_request()` 返回 `True`。
- 中间件 `LisenseCodeMiddlewarePro.process_request` 给 request 挂一个懒加载的 `request.role`（`SimpleLazyObject(lambda: get_request_role(request))`），本身不直接 403；真正的门禁在 `IamPermission`。

实测：

```text
V2 state: {'role':'V2','validated':True,'message':'验证通过',
           'recheck_at': now+1800, 'grace_expires_at': exp,
           'license_payload': {...}, 'expires_at': exp}
V1 state: {'role':'V1','validated':False,'message':'empty'}
```

### 4.3 一个实测细节：`code` 字段非空

在 `get_runtime_license_state` 里，即使 `license_blob` 是有效签名 blob，只要 `code` 为空，实测会直接返回：

```json
{"role":"V1","validated":false,"message":"empty"}
```

把 `code` 写成任意非空值（例如 `X`）后，同一 blob 立刻返回 V2。也就是说运行时 V2 条件至少包含 **`code` 非空 + `license_blob` 有效**。

而 `/user/active/` 在仿真 IAM 返回 `{result:true,message:'ok',data:{license_blob,license_schema}}` 时，实际写入是：

```text
code = ''              # 空
raw_code = <请求里的 code>
license_blob = <blob>
license_schema = 'signed_v1'
```

所以如果真实 IAM 也只返回 blob/schema，激活后实例仍会是 V1；真实 IAM 是否额外返回/写入 `code`，在没有真实授权服务器的情况下无法验证。这个点在实际部署排障时值得优先检查（查 `SysSettings` 表里 `code` 是否为空）。

---

## 5. V2：签名许可证（离线 RSA 校验）

### 5.1 blob 格式

```text
blob = urlsafe_b64(payload_json) + "." + urlsafe_b64(RSA_PKCS1v15_SHA256(payload_json))
```

- 签名算法：`RSA PKCS#1 v1.5 + SHA-256`
- 公钥：`/app/license/license_public_key.pem`（RSA-2048），也可由 settings `LICENSE_PUBLIC_KEY` / `LICENSE_PUBLIC_KEY_PATH` 覆盖；镜像里没有私钥
- payload 是紧凑 JSON（`separators=(',',':')`, `sort_keys=True`），验签针对**原始 payload 字节**，不是重新序列化后的字节

实测 payload（`role` 不是验签必需字段；有效 blob 一律按 V2 处理）：

```json
{"schema_version":"signed_v1",
 "expires_at":1795435154,
 "license_mac":"bc:24:11:8a:f0",
 "license_channel":"docker",
 "role":"V2"}
```

### 5.2 校验规则（实测）

| 输入 | 结果 |
|---|---|
| 合法签名 + `schema_version=signed_v1` + 未来 `expires_at` | `(True, '验证通过', payload)` |
| `schema_version` 缺失/不是 `signed_v1` | `(False, '许可证版本不匹配', {})` |
| 缺 `expires_at` | `(False, '许可证缺少过期时间', {})` |
| `expires_at` 已过期 | `(False, '许可证已过期', {})` |
| 签名错误 | `(False, '许可证签名无效', {})` |
| `license_mac` 与当前机器不一致 | **仍然 True**（本地不校验 MAC） |
| `license_channel` 与当前 channel 不一致 | **仍然 True**（本地不校验 channel） |

注意最后两条：虽然 payload 有 `license_mac` / `license_channel`，`verify_signed_license_blob(blob, expected_mac_address=..., expected_channel=...)` 在本地**没有真正强制**这两个字段。授权服务器在签发时可能做了绑定，但客户端/服务端本地验签不校验，意味着一个有效 blob 被复制到另一台机器也能通过本地校验（前提是 `code` 等状态条件满足）。

### 5.3 激活接口

前端“激活V2版本”弹窗：

```js
// src/components/base/magicMenu/header.vue
handleActiveCode() {
  this.$api.Task.activeCode({ 'code': this.code }).then(res => {
    if (res.result) window.location.reload()
    ...
  })
}
```

对应 API：

```http
POST /user/active/
Authorization: JWT <token>
Content-Type: application/json

{"code":"<用户输入的激活码>"}
```

后端 `UserViewSets.active` 会：

1. 用 `CodeSerializer` 校验 `code` 必填；
2. 调 `verify_code(code, mode='active')`，向 IAM `POST http://47.106.155.6:7999/iam/code/verify/`；
3. IAM 返回 `{message, result, data:{license_blob, license_schema}}`；
4. 成功后写 `raw_code`、`license_blob`、`license_schema`；
5. 前端 reload，`/user/info/` 的 `role` 变 V2、`is_forever` 变 true。

证据：[`artifacts/backend/auth_matrix.txt`](../artifacts/backend/auth_matrix.txt)

---

## 6. V1：旧版/在线 code 校验

### 6.1 实际请求

当 seed 不是 signed blob（即 `raw_code` 或 `code`）时，`verify_code(seed, mode='runtime')` 会发：

```http
POST http://47.106.155.6:7999/iam/code/verify/
User-Agent: MusicTagWeb-runtime/<version> (<channel>)
X-MTW-Version: <version>
X-MTW-Mode: runtime
X-MTW-Channel: <channel>
X-MTW-Build: <build>
X-MTW-Build-Env: <build_env>
X-MTW-License-Schema: signed_v1
Content-Type: application/json

{"code":"<seed>",
 "mac_address":"bc:24:11:8a:f0",
 "timestamp":1795349066,
 "sign":"0ad9b22d7e0703273202d8083b05c7a3a8ece78e621915b67e62faf20bc7b71e"}
```

签名算法（运行时 hook `hashlib.sha256` 确认）：

```text
sign = sha256( salt + code + mac_address + timestamp ).hexdigest()
salt = "ahsdok1238uasdjklxcjzxc9098qsacharles"     # 硬编码在 applications/user/utils.so
```

`genre_sign(body)` 的实现是：把 body 按 key 排序后**只拼接 value**，再 `sha256(salt + 拼接值)`；对 `{code, mac_address, timestamp}` 正好就是上面的输入。另有 `genre_sign_mac` 使用第二颗硬编码盐：

```text
salt_mac = "o1qwasdjojqweiw#@$asdASD#$ASD12g"
```

`validate_sign()` 会检查时间戳，提示文案是：

```text
请调整部署服务器的系统时间与北京时间相差不超过1分钟，否则验证超时！
```

### 6.2 IAM 响应要求

`verify_code` 实际只读取响应里的：

```text
message, result, data.license_blob, data.license_schema
```

如果 `result=true` 但 `data` 里没有 `license_blob`，返回：

```text
(False, '许可证服务未返回新版签名许可证', '', '', '')
```

拿到 blob 后仍然走第 5 节的本地 RSA 校验；校验通过才进入 V2。也就是说：**当前 2.8.2 的“V1 在线校验”实际上是向 IAM 换取 V2 签名许可证，再由本地离线验签**；V1 只是没有有效许可证时的降级角色。

### 6.3 旧版本地 code 辅助函数

`applications.user.utils` 里还有：

- `genre_lisense_code(code, period, period_count)`：生成 `base64("<code>-<expiry_ts>").<sha256(salt+code+expiry)>` 形式的旧 code；
- `validate_lisense_code(code)` / `validate_code(code)`：本地解析/校验旧 code。

这些函数在当前激活链路里不是主路径；实测 `validate_lisense_code` 对生成出的 code 返回 False（且行为与 `genre_lisense_code` 的签名方式并不完全一致），说明它们主要是旧版兼容/遗留代码，当前版本以 IAM 下发 signed license 为准。

---

## 7. V1/V2 的权限门禁：`IamPermission`

### 7.1 规则

所有业务 ViewSet 默认：

```python
permission_classes = (applications.permission.utils.IamPermission,)
authentication_classes = [JWTAuthentication]
```

`IamPermission.has_permission(request, view)` 实测：

1. 未登录 -> False，日志：
   ```text
   当前登录凭证已过期，请重新完成登录操作以恢复服务访问
   ```
2. 实例 role = V2 -> True（普通用户 / superuser 都是 True）。
3. 实例 role = V1 -> 只允许 `f"{view.basename}_{view.action}"` 在 `V1_VIEW_LIST` 中；否则 False，日志：
   ```text
   V1用户缺少权限：task_delete_files
   ```
4. **superuser 在 V1 下也不豁免**：实测 admin 访问 `task_delete_files` 同样 False。

### 7.2 `V1_VIEW_LIST`（完整列表）

```python
V1_VIEW_LIST = [
 'user_info','user_active',
 'task_file_list','task_music_id3','task_update_id3','task_batch_update_id3',
 'task_batch_auto_update_id3','task_fetch_lyric','task_fetch_id3_by_title',
 'task_translation_lyc','task_extract_lyric','task_tidy_folder',
 'task_remove_null_folder','task_split_filename','task_simplified_fields',
 'task_update_folder_state','task_replace_text','task_format_music_type',
 'task_split_cue','task_file_id3_list','task_fix_encoding','task_upload_image',
 'artist_aliases','sys_list','sys_create','record_list','record_create',
 'audit_log_list','runtime_log_list','plugin_list'
]
```

### 7.3 权限矩阵（实测）

| 实例 role | 用户 | `task_file_list` | `task_delete_files` | `user_info` | `sys_list` | `music_album` |
|---|---|---|---|---|---|---|
| V1 | 普通用户 | True | False | True | True | False |
| V1 | superuser | True | False | True | True | False |
| V2 | 普通用户 | True | True | True | True | True |
| V2 | superuser | True | True | True | True | True |
| 任意 | 匿名 | False | False | False | False | False |

补充：镜像默认 `IS_USE_PERMISSION='open'`，但实测它**不会**关闭 V1 限制；V1 的 403 仍会发生。

证据：[`artifacts/backend/auth_matrix.txt`](../artifacts/backend/auth_matrix.txt)

---

## 8. 另一套鉴权：`access_token`（APIGW / MCP）

### 8.1 存储与权限类

`SysSettings.key = "access_token"`，系统设置 -> API 管理 -> 认证管理里生成/复制；重新生成会立即让旧 token 失效。

`applications.permission.utils.AccessTokenPermission.has_permission` 实测：

| access_token 配置 | `Authorization` 头 | 结果 |
|---|---|---|
| 空 | 任意 | False |
| `abc` | 无 | False |
| `abc` | `abc` | True |
| `abc` | `Bearer abc` | True |
| `abc` | `Bearer  abc`（两个空格） | False |
| `abc` | `JWT abc` | False |

即：**要么原样 token，要么 `Bearer ` + token（一个空格）**；没有 Bearer 时会直接比较整个 header。使用方是 `/apigw/*`（小爱网关：info/lyrics/covers/mi_service 等）。

### 8.2 MCP

`applications/mcp/rpc.MCPServerView._check_auth`：

- `access_token` 为空 -> **不鉴权，全部放行**（README 也明确写了）；
- 配置后：接受原样 token 或 `Bearer <token>`；拒绝 `JWT ...`；
- 失败返回 401 JsonResponse，带 `WWW-Authenticate`。

实测矩阵：

```text
access_token=''   任何 header -> allow
access_token='abc' 无 header -> 401
access_token='abc' 'abc' -> allow
access_token='abc' 'Bearer abc' -> allow
access_token='abc' 'JWT abc' -> 401
```

证据：[`artifacts/backend/auth_matrix.txt`](../artifacts/backend/auth_matrix.txt)

---

## 9. 其他协议鉴权（顺带）

| 协议 | 路由 | 方式 |
|---|---|---|
| Navidrome 兼容 | `/api/*` | 自定义 `NavidromeAuthentication`，读 `X-ND-Authorization`（`Bearer <token>`），token 由 `get_token/authenticate_salt` 生成 |
| Subsonic 兼容 | `/rest/*` | 标准 Subsonic：`u` + `p`（明文/`enc:`）或 `u` + `t`(md5 token) + `s`(salt)；`api_key` 明确不支持 |
| OIDC | `/auth/oidc/login|callback` | 回调把 JWT 放到 URL hash `#oidc_token=...`，前端 `consumeOidcToken()` 写入 `AUTHORIZATION` cookie |
| 社交登录 | `/auth/social/<provider>/login|callback` | GitHub/Google/QQ/Weibo 等，回调后同样发 JWT |
| Django Session | `CsrfExemptSessionAuthentication` | 存在但不在默认 `DEFAULT_AUTHENTICATION_CLASSES` 里 |

---

## 10. 安全发现（按严重程度）

1. **JWT 签名密钥硬编码，可伪造任意用户 token（严重）**
   `django_vue_cli/settings.so` 里有固定 `SECRET_KEY`。为避免发布可复用的签名密钥，具体值不收录在报告或 Git 历史中。实测设置环境变量 `SECRET_KEY=...` **不会覆盖**镜像内的值；基于该镜像值签发的 HS256 token 可访问 `/user/info/`。这代表该镜像构建的登录签名密钥需要替换。
2. **V1 在线校验使用硬编码 HMAC 盐**
   `salt` / `salt_mac` 直接写在 `.so` 里，`sign = sha256(salt+code+mac+timestamp)` 可离线计算；虽然最终还要 IAM 校验 code，但协议本身没有秘密。
3. **IAM 使用明文 HTTP**
   `http://47.106.155.6:7999/iam/code/verify/`，无 TLS；中间人可观察/篡改（不过有签名和时间戳）。
4. **V2 license 本地不校验 MAC/channel**
   有效 blob 复制到其他实例也能通过本地验签；`license_mac`/`license_channel` 只是 payload 字段。
5. **`AUTHORIZATION` cookie 非 HttpOnly**
   前端 JS 写入/读取，XSS 可直接偷 token；同时 `CSRF_TRUST_ALL_ORIGINS=True`、`ALLOWED_HOSTS=['*']`、`CORS_ALLOW_CREDENTIALS=True`，部署时应收紧。
6. **`access_token` 比较是简单字符串相等**
   未见常量时间比较；且空配置时 `AccessTokenPermission` 拒绝，但 MCP 空配置直接放行（两者行为不一致，容易误配）。

---

## 11. 复现与工具

工作区里保留了：

- 报告：[`report/music_tag_web_v1_v2_auth.md`](music_tag_web_v1_v2_auth.md)
- 镜像拉取/解包脚本：[`artifacts/backend/extract_image.sh`](../artifacts/backend/extract_image.sh)
- 设置/路由证据：[`artifacts/backend/settings_and_routes.txt`](../artifacts/backend/settings_and_routes.txt)
- 登录/JWT 证据：[`artifacts/backend/login_jwt.txt`](../artifacts/backend/login_jwt.txt)
- V1/V2 + access_token 矩阵：[`artifacts/backend/auth_matrix.txt`](../artifacts/backend/auth_matrix.txt)
- 复现脚本：[`artifacts/backend/collect_auth_matrix.py`](../artifacts/backend/collect_auth_matrix.py)、[`collect_jwt.py`](../artifacts/backend/collect_jwt.py)
- V2 license 验签工具：[`artifacts/backend/verify_license.py`](../artifacts/backend/verify_license.py)
- JWT 解码工具：[`artifacts/backend/decode_jwt.py`](../artifacts/backend/decode_jwt.py)
- 镜像公钥：[`artifacts/license_public_key.pem`](../artifacts/license_public_key.pem)
- 前端还原源码：[`artifacts/frontend/`](../artifacts/frontend/)（axiosconfig、login.vue、header.vue、task-api.js、SystemInfo.vue）

示例：

```bash
# 校验一个 V2 license blob
python3 artifacts/backend/verify_license.py '<blob>' artifacts/license_public_key.pem

# 解码一个 access token
python3 artifacts/backend/decode_jwt.py '<token>'
```

---

## 12. 未决/限制

- 真实 IAM 服务器的响应字段（尤其 `code` 的写入）无法在无授权码情况下验证；本报告中的 IAM 交互是用 mock `requests.post` 捕获的请求 + 伪造响应还原的。
- `validate_lisense_code` 的旧版本地签名细节没有完全还原（当前主链路不使用它）。
- 没有在真实 Docker 容器里启动完整服务（无 daemon），而是用镜像内 Python 3.11 + 解包 rootfs 直接 import 模块、构造 Django 请求做动态验证；行为与镜像运行时一致，但未覆盖 nginx/redis/supervisor 层。
