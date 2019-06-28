---
en_title: How to add user in CentOS
title: CentOS 添加用户并授权 sudo
date: 2018-09-01
keywords: Linux, add user, sudo
description: 在 Linux 系统下很多命令都需要 root 权限，一般都会使用一个非 root 用户通过 sudo 命令来调用权限。这里记录了如何添加一个用户并设置 sudo 权限。
category:
  - Linux
tags:
  - sudo
photos:
  - https://miao.su/images/2019/02/23/1144130.jpg
---

原文地址：[CentOS 7中添加一个新用户并授权](https://blog.csdn.net/GGxiaobai/article/details/53504989)

# CentOS 7添加用户并授权

## 1. 创建新用户

```bash
# 创建用户
[root@vultr ~]# adduser suiga
# 设置密码
[root@vultr ~]# passwd suiga
Changing password for user suiga.
New password:
# 初始化密码有复杂度判断，如果过于简单，会有提示
BAD PASSWORD: The password is shorter than 7 characters
New password:
```

## 2. 授权

新创建的用户并不能使用sudo命令，需要给他添加授权。

sudo命令的授权管理是在sudoers文件里的。可以看看sudoers：

```bash
[root@vultr ~]# sudoers
-bash: sudoers: command not found
# whereis 查找位置
[root@vultr ~]# whereis sudoers
sudoers: /etc/sudoers /etc/sudoers.d

# ls -l 查看权限
[root@vultr ~]# ls -l /etc/sudoers
-r--r----- 1 root root 3938 Apr 10 20:27 /etc/sudoers
```

只有只读权限，如果想要修改，需要先添加`w`权限。

```bash
[root@vultr ~]# chmod -v u+w /etc/sudoers
mode of ‘/etc/sudoers’ changed from 0440 (r--r-----) to 0640 (rw-r-----)
```

然后就可以添加内容了，在下面一行追加新增的用户

```bash
[root@vultr ~]# vi /etc/sudoers


## Allow root to run any commands anywhere
root    ALL=(ALL)       ALL
suiga   ALL=(ALL)       ALL # 这个是新增的用户
```

保存退出(`:x`/`:wq`)，记得将之前加的写入权限收回：

```bash
[root@vultr ~]# chmod -v u-w /etc/sudoers
mode of ‘/etc/sudoers’ changed from 0640 (rw-r-----) to 0440 (r--r-----)
```

切换新用户，使用sudo

```bash
[root@vultr ~]# su suiga
[suiga@vultr root]$ sudo cat /etc/passwd

We trust you have received the usual lecture from the local System
Administrator. It usually boils down to these three things:

    #1) Respect the privacy of others.
    #2) Think before you type.
    #3) With great power comes great responsibility.

[sudo] password for suiga:
```

第一次使用会有提示，且需要输入用户密码，如果想不需要输入密码，可以将之前设置的最后一个`ALL`改为`NOPASSWD: ALL`。

# 删除用户密码、禁止登陆

## 删除密码

```bash
$ sudo passwd --delete <username>
# 或者
$ sudo passwd -d <username>
```

没有密码就无法登录，对于有些不应该有密码、不允许登录的账户就可以这样来禁止。

还有一种更安全的方式，设置用户为nologin。

## 设置用户为 nologin

```bash
$ sudo usermod -s /sbin/nologin <username>
```

可以结合两种方式来禁止用户的登录。

```bash
$ sudo passwd -d <username>
$ sudo usermod -s /sbin/nologin <username>
```
