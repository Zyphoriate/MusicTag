# Music Tag Web 2.8.2 授权链逆向与最小 patch 路径

对象：`xhongc/music_tag_web@sha256:4682a379f3b420afcbe0439ae2a78b2641748a96df60b9cfbec9600c804885fe`（v2.8.2，APP_BUILD `ff55c35f`）。

## 1. 观察方法

- 静态：镜像里 `applications/**` 是 Cython 编译产物（`.so`），无字节码；用符号表与字符串提取出认证相关的模块边界。
- 动态：在容器内用 Django `test client` + 对候选函数做日志包装，逐层记录参数与返回值；再用「清空授权行」制造 V1 态复现故障。

## 2. 模块与符号（静态证据）

```
applications/user/utils.so
  IAM_SERVER, LICENSE_GRACE_SECONDS, LICENSE_RECHECK_SECONDS, SIGNED_LICENSE_SCHEMA
  get_runtime_license_state, get_runtime_role, get_request_role,
  is_v2_license_request, _resolved_license_role, _license_runtime_seed,
  _store_runtime_license, _clear_runtime_license, _validate_local_signed_license,
  verify_code, clear_runtime_license
applications/user/license_crypto.so
  verify_signed_license_blob(license_blob, expected_mac_address='', expected_channel='')
  decode_signed_license_blob, get_public_key_material, has_public_key
applications/permission/utils.so
  IamPermission.has_permission / has_object_permission, V1_VIEW_LIST,
  get_request_role, get_runtime_role, is_v2_license_request, IS_USE_PERMISSION
```

## 3. 调用链（动态证据，插桩记录）

```
IamPermission.has_permission(request, view)
  └─ get_request_role(request)            -> 'V2' | 'V1'
       └─ is_v2_license_request(request)
            └─ get_runtime_role()
                 └─ get_runtime_license_state()      # 读缓存 / SysSettings
                      └─ _resolved_license_role      # 校验失败 -> V1
/user/info 响应体 data["role"]  ────────────┘        # 同一来源
```

`verify_signed_license_blob` 返回三元组 `(ok, message, payload)`，`payload` 形如
`{"role": "V2", "schema_version": "signed_v1", "expires_at": ..., "license_channel": "docker"}`。

V1 判定不是「未登录」，而是实例级 `role`：登录用户在 V1 实例里也走白名单。

## 4. V1_VIEW_LIST（30 项，直接读取模块常量）

```
artist_aliases, audit_log_list, plugin_list, record_create, record_list,
runtime_log_list, sys_create, sys_list, task_batch_auto_update_id3,
task_batch_update_id3, task_extract_lyric, task_fetch_id3_by_title,
task_fetch_lyric, task_file_id3_list, task_file_list, task_fix_encoding,
task_format_music_type, task_music_id3, task_remove_null_folder,
task_replace_text, task_simplified_fields, task_split_cue, task_split_filename,
task_tidy_folder, task_translation_lyc, task_update_folder_state,
task_update_id3, task_upload_image, user_active, user_info
```

`sys_dict`、`operation-preset_operations` 都不在其中 —— 所以 V1 实例上这两个接口报
`V1用户缺少权限: <code>`，消息文案与现场日志一致。

## 5. 故障复现（确认因果关系）

清空 `SysSettings` 的授权行并清缓存后：

```
state= V1 | /user/info 200 role=V1 | /script/operation-presets/ 403
       | /apimt/sys/dict/ 403      | 日志: V1版本：您没有执行该操作的权限。
```

与用户现场完全一致，说明「V2 变 V1」= 实例级 role 掉回 V1，而不是登录态问题。

## 6. patch 点对比

| 候选 | 位置 | 改一行可行？ | 影响面 | 结论 |
|---|---|---|---|---|
| 换公钥 | `/app/license/license_public_key.pem` | 构建期文件 | 破坏厂商授权信任链，真码也验不过 | 否 |
| 伪造 IAM 响应 | `requests.post` | 需劫持网络层 | 全局请求，早期 import 会破坏 gevent 的 ssl patch | 否 |
| 直接写状态 | `get_runtime_license_state` | 是 | 掩盖校验失败，与缓存/复核逻辑打架 | 否 |
| **实例角色** | **`get_runtime_role()`** | **是（返回 `'V2'`）** | 只影响「实例等级」判定：权限检查与 UI 布局 | **是** |
| 请求角色 | `get_request_role(request)` | 是 | 只修权限，`/user/info` 仍是 V1，UI 退回 V1 | 部分 |

`get_runtime_role` 是 UI 与权限共用的唯一汇聚点，改它一处即可同时修好两侧，且不碰请求层、
不碰数据库、不碰校验实现。

## 7. 采用的实现

```python
original = utils.get_runtime_role

def get_runtime_role(*args, **kwargs):
    try:
        original(*args, **kwargs)     # 保留原调用（缓存/复核副作用不变）
    except Exception:
        pass
    return 'V2'
```

配合（保持原有语义，不替换厂商公钥）：

- 数据库：entrypoint 写入 `code / raw_code / license_blob / license_schema`
- 通用校验函数：`verify_signed_license_blob`、`verify_code`、
  `_validate_local_signed_license` —— 先跑原逻辑，只对本镜像的演示 blob 兜底

## 8. 验证

| 场景 | 结果 |
|---|---|
| 正常启动 | `state=role V2`，`/user/info` 20/20 返回 V2 |
| 手动清空授权行（模拟校验失败） | `/user/info` role=V2、`/script/operation-presets/` 200、`/apimt/sys/dict/` 200 |
| 厂商公钥 | `md5 9406e20d1bd50e604336e93228686623`，与官方镜像一致 |
| 陌生 blob | `verify_signed_license_blob('abc.def') -> False` |
| 并发发布任务 | `batch_update_id3` 40/40 200，`greenlet.error` 0 |

## 9. 未决 / 边界

- `_resolved_license_role` 的内部判据（缓存 TTL、`license_last_verify_at` 与 grace 的具体用法）
  未逐行还原；本实现不依赖它。
- `get_runtime_role` 是否还有 UI 之外的调用点未逐一枚举；按符号表，调用方集中在
  `applications.user` 与 `applications.permission`。
- 本报告的结论基于该镜像构建，不含厂商后续版本。
