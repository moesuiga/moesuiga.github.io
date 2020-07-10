
docker启动gitlab-runner

```bash
# 创建一个 docker volume
docker volume create gitlab-runner-config

# 使用刚创建的 volume 跑 runner 容器
docker run -d --name gitlab-runner --restart always -v /var/run/docker.sock:/var/run/docker.sock -v gitlab-runner-config:/etc/gitlab-runner gitlab/gitlab-runner:v12.1.0
```

```bash
cat > /etc/gitlab-runner/config.toml << EOF
concurrent = 3
check_interval = 0
listen_address = "0.0.0.0:8093"

[session_server]
  listen_address = "0.0.0.0:8093"
  session_timeout = 1800

[[runners]]
  name = "my-first-runner"
  url = "http://gitlab.tuhu.cn/"
  token = "0907a304d568ae55d656eb305b3814"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
  [runners.docker]
    tls_verify = false
    image = "node:lts"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    shm_size = 0
EOF
```

```bash
# 创建一个配置模板
$ cat > /tmp/test-config.template.toml << EOF
[[runners]]
[runners.docker]
[[runners.docker.services]]
name = "mysql:latest"
[[runners.docker.services]]
name = "redis:latest"
EOF

# 注册 gitlab-runner
# --non-interactive 无交互的
gitlab-runner register --non-interactive --url "$URL" --registration-token "$TOKEN" --template-config /tmp/test-config.template.toml --description "gitlab-suiga-test" --tag-list "" --executor "docker" --docker-image node:latest


gitlab-runner register --non-interactive --url "$URL" --registration-token "$TOKEN" --template-config /tmp/test-config.template.toml --description "my-runner-for-tuhu-we-app-forum" --tag-list "mine,tuhu,we-app-forum" --executor "docker" --docker-image node:latest
```



创建一个名为 gitlab-runner 的容器
docker run -d --name gitlab-runner --restart always -v /var/run/docker.sock:/var/run/docker.sock -v /srv/gitlab-runner/config:/etc/gitlab-runner:Z gitlab/gitlab-runner:12.1.0

gitlab-runner:12.1.0 IMAGE ID
bf21e6c86e69

进入容器并注册 runner

docker exec -it gitlab-runner bash
gitlab-runner register

按提示填写 地址 与 token 及其他内容

GitLab地址与token
gitlab-ci coordinator URL
gitlab-ci token

在gitlab仓库的settings>ci/cd>runners settings中查看

执行器
executor:
docker

Docker镜像及版本
Docker image:
alpine:latest

gitlab-runner run
