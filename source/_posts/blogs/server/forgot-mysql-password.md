---
en_title: Forgot_MySQL_Password_And_How_To_Reset
title: 忘记了 MySQL 8.0 密码, 如何重置
date: 2019-11-28 17:42:48
updated: 2020-07-19 16:29:57
keywords: mysql, mysql8.0, linux, server
description: 因为个人服务器安装的 8.0 版本的 mysql，忘记密码后查找到的大部分都是 5.x 版本，在 8.0 中已经无法使用，所以记录一下 mysql 8.0 版本的重置密码方式
category:
  - Server
tags:
  - mysql
photos:
  - /images/miku-1.jpg
---

起因是安装了 8.0 版本的 MySQL，结果后来忘记了密码，上网查了好多 5.x 版本的重置密码方法，在 8.0 版本都不行。
后来找到了一篇同样是 8.0 版本的文章才修改成功。

链接地址: [Centos7重置Mysql 8.0.1 root 密码](https://blog.csdn.net/ManagementAndJava/article/details/80098525)

<!-- more -->

下面简单<ruby>记录<rp>(</rp><rt>chāo xiě</rt><rp>)</rp></ruby>一下方法。

### 第一步

修改配置文件，来免密登录。

```bash
vi /etc/my.cnf
```

找到 `[mysqld]`，在下面添加 `skip-grant-tables`。

![修改my.cnf配置](https://s2.ax1x.com/2019/11/28/QiXcfP.png)

然后重启 MySQL 服务

```bash
service mysqld restart
```

### 第二步

免密登录 MySQL。

```bash
mysql
# 或者
mysql -u root -p
# password: 直接回车
```

### 第三步

首先可以查看一下用户的相关信息，这一步可以忽略。

```bash
mysql> SELECT host, user, authentication_string, plugin FROM mysql.user;
```

`authentication_string` 就是加密后的密码，在 MySQL 5.7.9 以后废弃了 `password` 字段和 `password()` 函数。

`plugin` 则是密码的加密方式。

接下来清除当前root用户的密码。

```bash
mysql> use mysql;
mysql> UPDATE user SET authentication_string='' WHERE user='root';
```

此时root用户就处于密码为空的状态了。

退出 MySQL，**删除之前在 `/etc/my.cnf` 文件中添加的 `skip-grant-tables`，并重启 MySql 服务。**

### 第四步

登录 MySQL，因为之前已经清除了密码，所以在输入密码的时候直接回车即可登入。

```bash
mysql -u root -p
# password: 直接回车
```

使用 `ALTER` 修改密码。

```bash
mysql> ALTER user 'root'@'localhost' IDENTIFIED BY '123456';
```

至此，密码修改成功，可以退出重新使用用户名密码登录了。

## 参考资料：

https://blog.csdn.net/ManagementAndJava/article/details/80098525
