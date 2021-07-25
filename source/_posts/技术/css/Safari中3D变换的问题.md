---
title: Safari中3D变换的问题
date: 2021-7-25 23:25:19
updated: 2021-7-25 23:34:31
keywords: Safari, iOS, macOS, 3D, 3D变换, transform 3D, translate3d, z-index, overflow, backface-visibility
category:
  - 技术文章
tags:
  - CSS
photos:
  - /images/gallery/0037.png
---

## z-index 失效

在 Safari 浏览器中，使用 3D 变换时，会导致该元素的 z-index 层级设置失效，解决办法有两种：

1. 给变换元素的任意父元素添加 `overflow: hidden` 属性
2. 通过 `transform: translateZ()` 来设置 Z 轴的距离

## 多个相邻的 3D 变换元素穿模

在通过 `overflow: hidden` 解决了 `z-index` 属性失效的问题后，又发现多个在一起的元素，会出现穿模现象。
在 A 与 B 重叠的区域，本该 A 覆盖 B 的情况，却出现了一部分是 A 覆盖 B, 另一部分却是 B 覆盖 A。

暂时未找到解决方式，通过属性 `backface-visibility: hidden` 能稍微缓解一些这种情况，但依然无法根除。

## 参考链接

- https://www.zhangxinxu.com/wordpress/2016/08/safari-3d-transform-z-index/
- https://zhuanlan.zhihu.com/p/33194664
