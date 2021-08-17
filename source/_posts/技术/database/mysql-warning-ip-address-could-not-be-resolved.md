---
title: MySQL Warning IP address could not be resolved
keywords: MySQL, IP address could not be resolved, MySQL Warning, skip_name_resolve, MY-010055
description: 在服务器上的 MySQL 错误日志中发现大量同类型警告信息 <b>[Warning] IP address could not be resolved</b>, 查找解决方案并做一个记录。
date: 2021-08-17 18:14:35
updated: 2021-08-17 19:22:46
category:
  - 技术文章
tags:
  - 数据库
photos:
  - /images/gallery/0002.jpg
---

## 警告与解决方式

今天在服务器上看了下 MySQL 的错误日志，发现有大量的警告信息 `[Warning] [MY-010055] [Server] IP address 'xxx.xxx.xxx.xxx' could not be resolved: Name or service not known`，经过查找，了解到是 DNS 反解析错误。

因为 MySQL 数据库服务器没有配置 `/etc/hosts`，也没有 DNS 服务，导致了 mysqld 反向解析 IP 对应的域名失败。

解决方式可以通过添加 `skip_name_resolve` 配置到 `/etc/my.cnf` 中来跳过 DNS 反解析。
不过需要了解的是，这种解决方式会使得 MySQL 中的 `mysql.user` 用户表里的 `HOST` 列不能使用域名，只能使用 localhost 或者 IP 地址，否则无法登录。

所以在这么做之前，最好做个检查。
```sql
SELECT user,host FROM mysql.user WHERE host <> 'localhost' AND host RLIKE '[a-z]';
```

确认没有问题之后，打开 `/etc/my.cnf` 文件

```ini
[mysqld]
# ...
skip_name_resolve=1
skip_host_cache
```

然后重启 mysqld 服务 `service mysqld restart` 即可。

## 参考链接

- https://www.cnblogs.com/digdeep/p/4906423.html
- https://serverfault.com/questions/393862/mysql-warning-ip-address-could-not-be-resolved
- https://www.percona.com/blog/2008/05/31/dns-achilles-heel-mysql-installation/
