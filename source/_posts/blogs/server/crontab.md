---
title: crontab创建定时任务
keywords: /etc/crontab, crontab -e, crontab, Linux, task, 定时任务
description: 使用 `/etc/crontab` 和 `crontab -e` 创建定时任务，以及它们的区别
date: 2019-12-11 18:23:09
updated: 2020-08-11 23:04:34
category:
  - Server
tags:
  - crontab
photos:
  - /images/gallery/2019121102.png
---

## `/etc/crontab`

在 Linux 服务器中创建定时任务，可以在 `/etc/crontab` 文件中设置。

```bash
# /etc/crontab
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin
MAILTO=root
HOME=/

# For details see man 4 crontabs

# Example of job definition:
# .---------------- minute (0 - 59)
# |  .------------- hour (0 - 23)
# |  |  .---------- day of month (1 - 31)
# |  |  |  .------- month (1 - 12) OR jan,feb,mar,apr ...
# |  |  |  |  .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
# |  |  |  |  |
# *  *  *  *  * user-name  command to be executed

  00 00 1  *  * root echo "test crontab"
```

### 环境

首先来看最上面的几行内容：

`SHELL` 设置了定时任务运行的终端
`PATH` 设置了定时任务运行时的环境
`MAILTO` 设置的是任务运行结束后发送邮件给谁
`HOME` 则是设置当前的主页目录

需要注意的一个地方在于 `PATH`，定时任务的环境配置和手动运行某个命令时的环境配置并不一定是一样的。
有时候你会发现一个命令，自己手动运行时没有问题，可是放在定时任务里运行却报错误说“找不到某某命令”，原因很可能就是这个命令不再这里的 `PATH` 中。

### 基本参数

然后就是设置具体的定时任务：

就像文件注释中给出的提示一样，每一行就是一个定时任务；其中前五个参数是设置定时任务的时间，接着是运行命令的用户，最后则是运行任务的命令。

第一个参数表示分钟：你可以设置 0 - 59，意味着在一个小时的具体某分运行任务；
第二个参数表示小时：区间为 0 - 23，分别表示在具体某个时点运行任务，比如设置为 23，意思就是在晚上11点运行定时任务；
第三个参数表示月份的天数：取值范围是 1 - 31，也就是说只有在每个月某一日运行；
第四个参数是月份：范围区间 1 - 12，或者是月份英文的前三个字母缩写，表示只在某个月份执行任务；
第五个参数表示星期：范围是 0 - 6，**注意这里的 0 是指的周日**，同样可以用英文前三个字母的缩写表示，意思就是只在每周的固定哪一天执行。

像上面的示例: `00 00 1 * * root echo "test crontab"`，就是在每个月的1号，在终端输出一串字符 `test crontab`

### 高级一点的用法

除此以外，还有高级一点的用法，比如：

```bash
# 分别在 1/4/7/10 月份的 1/11/21 号 输出一下日期
0 0 1,11,21 1,4,7,10 * root echo `date +%x`

# 每隔 5 分钟执行一次
*/5 * * * * root <command whatever you want>

# 每个周末的 1 点到 6 点的 30 分执行
30 1-6 * * 0,6 root <just command>
```

> **注意**：
> 你可能会突发奇想的设置一个类似这样的定时参数 `0 23 24 12 0,6`。
> 你以为它应该在 12 月 24 日并且这一天还是周末的情况下执行任务；
> 但是遗憾的是这样不行，它可能会分别在 12 月 24 日和周末时执行
> 周和日月不能并存。

## crontab

除了直接编辑 `/etc/crontab` 文件之外，还可以通过 `crontab -e` 命令来编辑设定定时任务。

这里的设置和 `/etc/crontab` 的不同之处在于 `crontab -e` 命令设置的定时任务中，没有 `user` 参数。
因为 `crontab` 就是针对用户级别的，也就是说 `crontab -e` 命令设置的定时任务中的 `user` 就是运行 `crontab -e` 命令时的用户。
除此之外，其他与 `/etc/crontab` 文件一样。

### crontab的参数

```bash
crontab [-u username] [-l|-e|-r]
# 选项与参数：
# -u：只有 root 才能进行这个任务，亦即帮其他使用者创建/移除 crontab 工作排程；
# -e：编辑 crontab 的工作内容
# -l：查阅 crontab 的工作内容
# -r：移除所有的 crontab 的工作内容，若仅要移除一项，请用 -e 去编辑
```

## 参考资料：

https://www.cnblogs.com/xd502djj/p/4292781.html
http://vbird.dic.ksu.edu.tw/linux_basic/0430cron_3.php
https://baike.baidu.com/item/crontab
https://www.cnblogs.com/ggjucheng/archive/2012/08/19/2646763.html
