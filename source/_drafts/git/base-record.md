---
title: git 基础用法
date: 2018/2/28 11:35:32
keywords: git, ssh-keygen, ssh key
description: 记录 git 的一些基础使用
photos:
  - https://miao.su/images/2019/01/12/00363488.jpg
---

> 记录一些git的命令

## 生成ssh key
```
ssh-keygen [-t rsa] [-f ~/.ssh/id_rsa] [-C "wyw1121@live.com"]
```

## 多账号ssh使用配置
```bash
$ vi ~/.ssh/config
# Windows系统在 C:\Users\<你的用户名>\.ssh下，一开始是没有config文件的，需要先创建一个

# 根据账号与git主机多设置几个就OK了
# 注意Host不要重复，不然会只使用第一个
Host github.com # 自定义主机名，在本地设置远程地址时，使用这个主机名
    HostName github.com # 实际主机名
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa
    User moesuiga
```
<!-- more -->

## branch
查看分支: `git branch [-a]`
新增分支: `git branch <branch>`
以历史的某次提交为HEAD新增分支: `git branch <branch> <SHA1>`
删除分支: `git branch (-d | -D) [-r | --remotes] <branch>`

## checkout
```bash
# 切换到已有分支
git checkout <branch>

# 新建并切换到分支
git checkout -b <branch>

# 以历史的某次提交为HEAD新增并切换到分支
git checkout -b <branch> <SHA1>

# 切换到某次提交
# 需要注意的是，这个命令是把HEAD移动到特定的提交处
# 而如果当前HEAD没有任何分支引用的话，会造成HEAD分离
# 如果需要添加新的提交，应该以此次提交为根创建一个新的分支
# 然后再做修改与提交
git checkout <SHA1>/<HEAD>

# 文件回滚
# 将某个文件回滚到之前的某次提交
# 与git revert不同的是，该命令会撤销文件后面的所有更改
git checkout <HEAD>/<SHA1> <file>
```

## revert

代码回滚, 与`git reset`不同，一般来说在公共仓库里回滚代码，都是使用`git revert`的。

而`git reset`更多情况是在本地代码还未提交到公共仓库时进行撤销操作的。

原因是：`git revert`是以一个新的提交来撤销某次提交，是有提交记录的。
而`git reset`则是将分支末端指向了另一个提交，使得其后的提交成为了悬挂提交，
在Git执行垃圾回收时，被删除。

```bash
# 撤销某次提交
# 这里只会撤销特定提交的更改
# 如果有多个提交要撤销，就需要多个revert提交
# 可以通过添加选项 `-n` 或者 `-no-commit`使得撤销的更改保留在缓存区
# 然后只添加一次提交记录
git revert [-n] <HEAD>/<SHA1> [<HEAD>/<SHA1> ...]
```

## rebase

可以配合`git revert`，把多次revert合并成一次提交。

虽然`git revert`可以通过添加 `-n` 参数，只产生一次提交，但无法保留全部的回滚日志信息。而`git rebase`可以

```bash
$ gl
* 61093fb (HEAD -> master) Revert "revert: revert HEAD~"
* 510b237 Revert "Revert "feat: checkout file test""
* bc8005d Revert "feat: checkout file test"
* e130b32 feat: checkout file test
* 50ea78b revert: revert HEAD~
* dbae4b9 feat: add third
* 696164a feat: add second
* 60a3dae feat: add first

$ git rebase -i  bc8005d
# 使用 git rebase -i 命令出现如下交互界面
# git rebase -i 是交互式变基操作的命令，
# 如果本地分支追踪某个远端分支，并且希望变基操作从最久本地提交开始，
# 则直接执行 git rebase -i 指令即可，否则需要显式指定从哪个提交开始。

pick 510b237 Revert "Revert "feat: checkout file test""
pick 61093fb Revert "revert: revert HEAD~"

# Rebase bc8005d..61093fb onto bc8005d (2 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out

# 根据上面的提示，将第一次提交外的其他提交操作的pick更改为squash
pick 510b237 Revert "Revert "feat: checkout file test""
squash 61093fb Revert "revert: revert HEAD~"

# 保存退出后，会出现合并提交的提交日志编辑界面，如下
# This is a combination of 2 commits.
# This is the 1st commit message:

Revert "Revert "feat: checkout file test""

This reverts commit bc8005dd83eafacd4a0e98a286192c1aa38c2eb2.

# This is the commit message #2:

Revert "revert: revert HEAD~"

This reverts commit 50ea78bfc58d164977cf9a1a7123c1504f773a0e.

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Fri Sep 7 16:29:27 2018 +0800
#
# interactive rebase in progress; onto bc8005d
# Last commands done (2 commands done):
#    pick 510b237 Revert "Revert "feat: checkout file test""
#    squash 61093fb Revert "revert: revert HEAD~"
# No commands remaining.
# You are currently rebasing branch 'master' on 'bc8005d'.
#
# Changes to be committed:
#       modified:   1
#       new file:   3

# 保存退出后就完成了revert的压缩合并
$ git log
commit 9d861c919feff298403d03025d86e19f5eb887d5 (HEAD -> master)
Author: wangyouwei <wangyouwei@tuhu.cn>
Date:   Fri Sep 7 16:29:27 2018 +0800

    Revert "Revert "feat: checkout file test""

    This reverts commit bc8005dd83eafacd4a0e98a286192c1aa38c2eb2.

    Revert "revert: revert HEAD~"

    This reverts commit 50ea78bfc58d164977cf9a1a7123c1504f773a0e.
```

## clone
克隆远程仓库: `git clone [-b <branch>] <url> [<project-name>]`

## pull
拉取远程仓库: `git pull <name | url> <branch>`

## push
推送到远程仓库: `git push [--set-upstream] <name | url> <branch>`

## remote
查看远程地址: `git remote [options: -a | -v]`
添加远程地址: `git remote add <name> <url>`
设置远程地址: `git remote set-url <name> <url>`
删除远程地址: `git remote remove <name>`
重命名地址名: `git remote rename <oldname> <newname>`

## stash
在工作区做了改动后，需要切换其他分支，而又不希望将改动提交时，可以使用 `git stash` 存储当前改动。
```bash
$ git stash # 往堆栈推送一个新的储藏
Saved working directory and index state WIP on ts-components: 4b229ba 删除多余代码

$ git stash list # 查看堆栈里的存储列表
stash@{0}: WIP on ts-components: 4b229ba 删除多余代码

$ git stash pop # 应用最近一次存储并从堆栈中删除该存储

$ git stash pop stash@{2} # 应用指定的某次存储并删除

$ git stash pop --index # 应用存储时尝试恢复暂存区

$ git stash apply # 同pop，但只应用，不删除

$ git stash drop # 与apply相反， 不应用，只删除
```
