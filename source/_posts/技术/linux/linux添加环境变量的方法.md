---
en_title: How_To_Add_Context_Variables_In_Linux
title: Linux 添加环境变量的方法
keywords: Linux, PATH, $PATH, export, 环境变量
description: 记录一下在 Linux 系统下添加环境变量的几种方式
date: 2019-3-3 16:02:21
updated: 2021-5-11 21:19:02
category:
  - 技术文章
tags:
  - Linux
photos:
  - http://img.wayowe.com/blog_gallery/ab_007.jpg@gallery
---

在 Linux 服务器上使用 NodeJS 时，明明通过 `npm install --global` 进行了包的全局安装，可是安装完了之后却发现在命令行里还是无法使用。
原因就是没有将其加入环境变量。

我的 node 包目录为 `~/node-v10.9.0-linux-x64/bin/`，
那么可以通过如下三种方式来把这个目录加入环境变量。

## 1. 直接在命令行通过 export 命令加入

``` bash
$ ls ~/node-v10.9.0-linux-x64/bin/
node  npm  npx  pm2  pm2-dev  pm2-docker  pm2-runtime  yarn  yarnpkg
$ npx -v
-bash: npx: command not found
$ echo $PATH
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/suiga/.local/bin:/home/suiga/bin
$ export PATH=$PATH:~/node-v10.9.0-linux-x64/bin/
$ echo $PATH
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/suiga/.local/bin:/home/suiga/bin:/home/suiga/node-v10.9.0-linux-x64/bin/
$ npx -v
6.8.0
```

这种方式添加起来确实快捷，添加后直接就能使用。但是注销重新登录后，你会发现之前加入的环境变量没有了。
也就是说这种方式属于临时性添加的。

想要永久的添加还是需要使用下面的方式。

## 2. 修改 /etc/profile 文件

``` bash
$ sudo vi /etc/profile
# 在文件中加入
export PATH="$PATH:~/node-v10.9.0-linux-x64/bin"

# 注销重新登录后生效
```

## 3. 修改 .bashrc 文件

``` bash
$ vi ~/.bashrc # 或者 sudo vi /root/.bashrc
# 在文件中加入
export PATH="$PATH:~/node-v10.9.0-linux-x64/bin"

# 同样需要先注销才能生效
```

----

参考链接：

- [在Linux里设置环境变量的方法（export PATH） - 玉米疯收 - 博客园](https://www.cnblogs.com/amboyna/archive/2008/03/08/1096024.html)
