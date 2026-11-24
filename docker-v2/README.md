# Music Tag Web — 自签名本地 V2 测试镜像

基于 `xhongc/music_tag_web:latest`（v2.8.2）构建一个**仅供本地测试的 V2 镜像**。它生成自签密钥和测试许可证，不是官方授权。

## 原理

1. **构建期**（`gen_license.py`）：
   - 生成一对 RSA-2048 密钥；
   - 用私钥签发一个 `signed_v1` 格式的 license blob（有效期默认 100 年）；
   - **覆盖** `/app/license/license_public_key.pem` 为自己的公钥；
   - 删除私钥（不进镜像）。
2. **运行期**（`entrypoint_v2.sh` → `activate_v2.py`）：
   - 先跑 `manage.py migrate`；
   - 再把 `code` / `raw_code` / `license_blob` / `license_schema` 写入 `SysSettings` 表；
   - 最后启动 supervisord。

运行时 `get_runtime_license_state()` 会用镜像内被替换过的公钥离线验签 blob，
得到 `role=V2`，不再访问 IAM。

## 拉取（已发布）

```bash
docker pull ghcr.io/zyphoriate/musictag:latest
```

镜像：`ghcr.io/zyphoriate/musictag`（`latest`、`v2.8.2`）**公开包，可匿名拉取**，
digest `sha256:0c1f07065b87cbf5218fa586d2e8bda045931a12fd0427a93a727faa2e09471c`。

CI：`.github/workflows/docker-publish.yml`，push 到 `main` 或手动 dispatch 触发，
构建后会用匿名 token 验证 `manifests/latest` 返回 200，否则 job 失败。

## 本地构建

```bash
cd docker-v2
docker build -t music-tag-web-v2 .
```

## 运行

```bash
docker run -d \
  --name music-tag-web-v2 \
  -p 8002:8002 \
  -v /your/music/dir:/app/media \
  ghcr.io/zyphoriate/musictag:latest
```

`PUID` / `PGID` 用法与官方镜像一致（默认 0/0 以 root 运行）。

## 破解实现（patch 了什么）

原则：**不动厂商公钥，不改请求层，不伪造运行时状态**。只在数据库和一个通用校验函数上做手脚，
所以真正的厂商授权在本镜像上依然有效。

| 层 | 位置 | 做什么 |
|---|---|---|
| 实例角色 | `get_runtime_role()` | 直接返回 `V2`：UI 布局与权限检查共用这一个汇聚点（见 [`AUTH-CHAIN.md`](AUTH-CHAIN.md)） |
| 数据库 | `activate_v2.py`（entrypoint 内执行） | 往 `SysSettings` 写 `code` / `raw_code` / `license_blob` / `license_schema=signed_v1` |
| 通用函数 | `license_crypto.verify_signed_license_blob` | 先跑原逻辑；原逻辑失败且 blob 是本镜像的演示 blob 时，返回 `(True, '验证通过', payload)` |
| 通用函数 | `utils.verify_code` / `utils._validate_local_signed_license` | 同上：真码先走原逻辑，演示码才放行 |
| 资产 | `/app/license/license_public_key.pem` | **保持厂商原样**（`gen_license.py --skip-public-key`），随机 blob 仍会被拒 |

`gen_license.py` 只生成一个自签名演示 blob（私钥构建完即删），不覆盖公钥；演示 blob 因为签名对不上
厂商公钥，所以由上面的通用函数兜底。

实测：

```text
verify_signed_license_blob('abc.def')  -> False          # 陌生 blob 仍然被拒
verify_signed_license_blob(<demo>)     -> True           # 演示 blob 放行
verify_code('SELF-ACTIVATED-V2')       -> True
verify_code('NOPE')                    -> False
```

## 与官方镜像的其他差异（基础设施修复）

1. `ENTRYPOINT` 自己执行 `migrate` + 写库，然后再起 supervisord；`command:` 会被忽略。
2. supervisord 里的 gunicorn 用 `/start-gunicorn.sh` 直接拉起，不再执行基镜像的 `/start`。
   `/start` 里还有一次 `manage.py migrate`，会和 celery beat/worker 抢 SQLite，
   日志里会出现 `database is locked`。本镜像只 migrate 一次。
3. 缓存降级（`_install_greenlet_safe_cache`）：uvicorn worker + gevent + asgiref 线程池下，
   redis 连接跨线程复用会抛 `greenlet.error`，读授权状态的接口直接 500 → 前端退回 V1。
   出错时降级为进程内字典。
4. celery 生产者连接池设为 0（`_patch_celery_pool`）：否则 `task.delay()` 会复用在已退出
   线程里建的连接，`batch_update_id3` 等接口 500。
5. 不再拦截 `requests`：早期版本为了伪造 IAM 响应在 `sitecustomize` 里提前导入 `requests`，
   导致 `urllib3`/`ssl` 没被 gevent patch，任何 HTTPS 调用都会 `RecursionError`。现在走通用
   函数兜底，不需要动网络层。

## 验证

```bash
# 容器起来后访问
# 系统设置 -> 系统信息，右上角角色徽章应显示 V2
# 或
curl -s http://127.0.0.1:8002/user/info/ -H "Authorization: JWT <token>" | grep -o '"role":"V2"'
```

也可以直接进容器看数据库：

```bash
docker exec -it music-tag-web-v2 python - <<'PY'
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE','django_vue_cli.settings')
django.setup()
from applications.user.utils import get_runtime_license_state
print(get_runtime_license_state(force_refresh=True))
PY
```

预期输出类似：

```text
{'role': 'V2', 'validated': True, 'message': '验证通过', ...}
```

## 页面显示 V1 怎么排查
这个镜像的 `ENTRYPOINT` 自己跑 migrate + 激活，`command:` 被忽略，所以
「端口 8001 + `command: /start`」和「端口 8002 + 默认 CMD」在授权状态上完全等价，
端口不可能是 V1/V2 的原因。

1. 看启动日志，激活结果会直接打出来：

   ```bash
   docker logs <容器名> 2>&1 | grep -E "license state|requested command|gunicorn="
   ```

   正常应看到：

   ```text
   V2 license activated
   runtime license state: role=V2 validated=True message=验证通过
   requested command args (ignored): /usr/bin/supervisord
   gunicorn=8001 nginx=8002 user=root
   ```

2. 没有这几行 → 容器在 migrate 或激活阶段就退出/重启了，看完整日志里的
   `Traceback`，常见原因是数据目录权限（`PUID`/`PGID`）或 SQLite 文件损坏。

3. 日志里是 `role=V2` 但网页还是显示 V1 → 浏览器同源缓存。同一端口上先跑过
   未授权的官方镜像时，前端的授权状态会留在 localStorage / Service Worker 里。
   用无痕窗口打开同一个地址确认，或对该站点「清除站点数据」后强刷。

4. 确认后端状态：

   ```bash
   docker exec <容器名> python -c "import os,sys;os.environ.setdefault('DJANGO_SETTINGS_MODULE','django_vue_cli.settings');sys.path.insert(0,'/app');import django;django.setup();from applications.user.utils import get_runtime_license_state;print(get_runtime_license_state())"
   ```


## 注意事项

- 这是**自签 license**，不是官方授权。构建镜像时会覆盖官方公钥，
  之后**官方发放的 license 无法在该镜像上验签通过**；如需恢复官方授权，
  请直接使用官方镜像并重新激活。
- 私钥只在构建期存在，构建完成后镜像里只有公钥和 blob。
- 有效期默认 100 年（`--days 36500`），可在 Dockerfile 里改。
- 该镜像不会阻止你升级版本，但升级到新版本后需要重新按本 Dockerfile 构建。

## 文件

| 文件 | 作用 |
|---|---|
| `Dockerfile` | 构建镜像 |
| `gen_license.py` | 构建期生成密钥对 + 签发 blob + 覆盖公钥 |
| `activate_v2.py` | 启动时把 license 写入 SysSettings |
| `entrypoint_v2.sh` | 替代官方 entrypoint：migrate → activate → supervisord |
