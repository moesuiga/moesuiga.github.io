---
title: HTML内如何使用Unicode字符
keywords: HTML, Unicode
description:
category:
  - HTML
tags:
  - Unicode
date: 2020-7-7 18:18:49
updated: 2020-7-7 18:18:57
photos:
  -
---

在HTML中使用Unicode字符的方式：`&#码点;`

四字节除外

一字节码点范围：0-127
二字节码点范围：128-2047
三字节码点范围：2048-65535

UTF-8是可变长度编码：

一字节二进制：0xxxxxxx
二字节二进制：110xxxxx 10xxxxxx
三字节二进制：1110xxxx 10xxxxxx 10xxxxxx
四字节二进制：11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

https://blog.csdn.net/yaomingyang/article/details/79374209
http://www.ruanyifeng.com/blog/2014/12/unicode.html
