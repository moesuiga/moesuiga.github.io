---
title: git修改历史提交中的名称或邮箱地址
keywords: git,history,committer
description: 有时候在Git提交时，配置的名称或邮箱有问题，需要修改的话，应该如何重写历史中的提交人信息
date: 2021-03-09 15:35:08
updated: 2021-03-09 15:55:36
---

## 如果仅修改前一次的提交

可以在修改好配置后，使用 `git commit --amend` 命令重新提交。
具体如下：

```bash
$ git config user.name "新的名称"
$ git config user.email "新的邮箱"
$ git commit --amend -m "提交信息"
```

## 需要修改历史中的多个提交

将以下内容复制到一个文件中，如 change-committer.sh。
将文件放到要修改的git仓库中，运行 `bash change-committer.sh`。

```bash
#!/bin/bash
git filter-branch --commit-filter '
OLD_EMAIL="将要被替换的邮箱地址"
CORRECT_NAME="新的名称"
CORRECT_EMAIL="新的邮箱地址"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
  GIT_COMMITTER_NAME="$CORRECT_NAME"
  GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
  GIT_AUTHOR_NAME="$CORRECT_NAME"
  GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
  git commit-tree "$@"
else
  git commit-tree "$@"
fi' HEAD
```

根据情况也可以用提交人名称来检索替换，比如用 `OLD_NAME="要替换的名称"` 替换 `OLD_EMAIL="将要被替换的邮箱地址"` 再用 `if [ "$GIT_COMMITTER_NAME" = "$OLD_NAME" ]` 替换 `if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]`。

而具体要替换 提交人(committer) 或 作者(author) 或两者都要替换，根据情况来保留下面这部分内容
```bash
# 提交人
GIT_COMMITTER_NAME="$CORRECT_NAME"
GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
# 作者
GIT_AUTHOR_NAME="$CORRECT_NAME"
GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
```

## 注意

git历史记录的修改是一个较为危险的操作，尤其是多人协作，还要修改已提交到远程仓库的历史时。
重写历史会导致与远程的历史提交冲突，无法再正常提交到远程仓库，只能通过强制覆盖提交。
一旦出现问题，他人无法再撤销找回历史。
所以一定要慎重再慎重。
