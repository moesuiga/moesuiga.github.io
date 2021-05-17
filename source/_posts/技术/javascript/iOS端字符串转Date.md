---
en_title: String_To_Date_In_IOS
title: iOS端字符串转Date
keywords: new Date, String2Date, iOS
description: JavaScript 在 iOS 端把字符串转换为 Date 对象的兼容写法
date: 2019-8-26 10:33:43
updated: 2021-5-11 08:52:41
category:
  - 技术文章
tags:
  - JavaScript
photos:
  - /images/gallery/2019082601.png
---

## iOS 端的 String to Date

在 iOS 端使用 `new Date()` 时，需要注意参数为字符串日期时，不能使用 `YYYY-MM-DD` 的形式，要把 `-` 替换为 `/`，使用 `YYYY/MM/DD` 这种形式。

```js
var timeStr = '2019-8-26 10:33:43';
var date = new Date(timeStr.replace(/-/g, '/'));
```
