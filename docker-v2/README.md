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
digest `sha256:61edc43cb4dd60c84d597d0923e9d1b876e3a1b8cf2c78489da4dba1186ffe0e`。

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
