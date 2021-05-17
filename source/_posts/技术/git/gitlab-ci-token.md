---
title: gitlab-ci 中的 token
keywords: gitlab-ci.yml, CI_TAG_UPLOAD_TOKEN, CI_JOB_TOKE
description: 记录一下 gitlab-ci 中的 token 如何创建及使用
date: 2021-01-21 09:30:46
updated: 2021-5-11 08:49:55
category:
  - 技术文章
tags:
  - git
---

## 创建
在 *个人* -> *设置* -> *access token* 中创建 *CI_TAG_UPLOAD_TOKEN*。

## 使用
创建后，再到项目中的 *设置* -> *CI/CD* -> *secret values* 中创建 *CI_TAG_UPLOAD_TOKEN*，并把值设置为前面生成的值。

在 *gitlab-ci.yml* 文件的脚本中设置

```yml
script:
  - url_host=`git remote get-url origin | sed -e "s/https:\/\/gitlab-ci-token:.*@//g"`
  - git remote set-url origin "https://gitlab-ci-token:${CI_TAG_UPLOAD_TOKEN}@${url_host}"
```
