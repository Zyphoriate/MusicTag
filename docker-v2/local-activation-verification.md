# 本地激活适配验证

2026-11-23 更新：镜像通过 `MTW_LOCAL_TEST_LICENSE=1` 加载本地适配器。

- 页面激活码：`SELF-ACTIVATED-V2`
- 也接受本次构建的完整签名 blob。
- 其他激活码返回本地错误提示。
- `verify_code` 在 Django 初始化后替换为本地签名校验，返回非空的 legacy code，避免激活写入空 code 后降回 V1。
- `/iam/code/verify/` 的 requests.post 调用由本地适配器响应；其他请求继续原路径。
- 本地适配仅存在于这个自签测试镜像，不修改宿主机网络或 DNS。

HTTP 验证结果（地址 http://192.168.1.6:18002/）：

| 接口 | 结果 |
|---|---|
| POST /user/active/，code=SELF-ACTIVATED-V2 | HTTP 200，result=true |
| GET /user/info/，紧接激活请求 | HTTP 200，role=V2 |
| GET /apimt/sys/dict/ | HTTP 200，result=true |
| GET /apimt/open_api/ | HTTP 200，result=true |
| POST /apimt/file_list/ | HTTP 200，total_count=2 |

测试账号、音频和数据卷沿用此前实例。此次通过重建整个容器清除旧 gunicorn 进程，未只重启 supervisor 中的 shell 进程。

旧说明中“不要使用页面激活入口”已经不适用于此更新版本；现在可以输入上面的本地测试码。
