title: nginx已启动，但通过IP无法访问
date: 2018年9月2日
---

很可能是因为没有开启80端口

```bash
$ sudo vi /etc/sysconfig/iptables
#允许80端口通过防火墙，加在COMMIT之前
A INPUT -m state –state NEW -m tcp -p tcp –dport 80 -j ACCEPT

# 保存
$ sudo service iptables save

# 重启服务
$ sudo systemctl restart iptables.service
```

## Error

启动iptables.service时，出现错误`Assertion failed on job for iptables.service.`

大致有两种可能：`/etc/sysconfig/iptables`文件内没有任何规则，或者该文件不存在
引自：
https://mellowhost.com/blog/linux-assertion-failed-on-job-for-iptables-service.html

原文：
> The error appears because you don’t have any rule in /etc/sysconfig/iptables or the file doesn’t exist either. You can ignore the error as iptables would still run. To eradicate the error, simply make sure you have some iptables rules loaded on your system using the status command:
>
> ```
> iptables -S
> ```
> And then, run:
>
> ```
> service iptables save
> ```
>
> Once done, restarting iptables shouldn’t show the error any longer.
