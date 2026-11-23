# MusicTag 镜像逆向：xhongc/music_tag_web:latest

针对 `xhongc/music_tag_web:latest`（v2.8.2）的 V1/V2 鉴权逆向分析。

## 直接看

- **完整报告**：[`report/music_tag_web_v1_v2_auth.md`](report/music_tag_web_v1_v2_auth.md)
- **核心结论**：V1/V2 不是 API 版本，而是**实例授权等级**。V1 为未激活/免费受限实例，`IamPermission` 只放行 `V1_VIEW_LIST` 的接口（superuser 也不豁免）；V2 为已激活/永久实例，登录用户基本全放行。V2 用 RSA-PKCS1v15-SHA256 签名的 `license_blob` 本地离线校验；旧版/V1 走 IAM `/iam/code/verify/` 在线校验。登录本身统一是 JWT（`Authorization: JWT <token>`，7 天），另有 `access_token` 用于 `/apigw/*` 与 `/mcp/`。

## 证据与工具

| 文件 | 内容 |
|---|---|
| [`artifacts/backend/settings_and_routes.txt`](artifacts/backend/settings_and_routes.txt) | Django settings、REST_FRAMEWORK/SIMPLE_JWT、路由 |
| [`artifacts/backend/login_jwt.txt`](artifacts/backend/login_jwt.txt) | 脱敏后的登录响应与 JWT 结构证据 |
| [`artifacts/backend/auth_matrix.txt`](artifacts/backend/auth_matrix.txt) | V1/V2 权限矩阵、V2 license 校验矩阵、access_token/MCP 矩阵 |
| [`artifacts/backend/extract_image.sh`](artifacts/backend/extract_image.sh) | 无 Docker daemon 拉取并解包镜像 |
| [`artifacts/backend/verify_license.py`](artifacts/backend/verify_license.py) | 用镜像公钥校验 V2 license blob |
| [`artifacts/backend/decode_jwt.py`](artifacts/backend/decode_jwt.py) | 解码/校验 access token |
| [`artifacts/license_public_key.pem`](artifacts/license_public_key.pem) | 镜像内置 V2 license 公钥 |
| [`artifacts/frontend/`](artifacts/frontend/) | 从 source map 还原的前端关键源码 |

## 关键算法速查

- 登录：`POST /apimt/token/` → SimpleJWT HS256，`Authorization: JWT <token>`，7 天。
- V2 license：`blob = b64url(payload_json) + "." + b64url(RSA_PKCS1v15_SHA256(payload_json))`，payload 必须含 `schema_version="signed_v1"`、`expires_at`。
- V1 在线：`POST http://47.106.155.6:7999/iam/code/verify/`，`sign = sha256(salt + code + mac_address + timestamp)`，salt 硬编码。
- V1/V2 状态：`SysSettings` 的 `raw_code` / `code` / `license_blob` / `license_schema`；seed 优先级 `license_blob > raw_code > code`。
- V1 受限接口列表：`V1_VIEW_LIST`（见报告第 7 节）。
- API token：`Authorization: <access_token>` 或 `Bearer <access_token>`；MCP 空配置放行，`AccessTokenPermission` 空配置拒绝。

## 衍生构建

- [`docker-v2/`](docker-v2/README.md)：基于官方镜像构建一个**启动即为 V2 授权**的自激活镜像（自签 license，覆盖镜像内公钥）。

## 注意

- 该镜像的 `SECRET_KEY` 硬编码在 `settings.so`，实测可用它伪造 JWT（报告第 10 节）。
- 分析未启动完整容器，而是解包 rootfs 后用镜像内 Python 3.11 + Django 直接 import/构造请求验证；未覆盖 nginx/redis/supervisor 层。
