---
en_title: CSS_border-image
title: 使用 border-image 实现图片的特殊拉伸
date: 2019-3-12 16:16:26
updated: 2020-11-30 00:32:50
keywords: css, border-image, image, background, stretch, 图片, 拉伸
description: 对于某些特殊样式的图片，需要拉伸图片而不影响边缘的部分时，可以使用 border-image 属性来实现
category:
  - CSS
tags:
  - image
  - border-image
photos:
  - /images/gallery/2019031201.png
---

今天设计妹子问了我一个问题：

![优惠券图片](https://miao.su/images/2019/03/12/0af1f1da3d377c2d4405b.png)

> 图片里左边的部分定宽，右边的部分需要根据内容文字来加长或缩短，但是又不能致使图片变形，只能从中间部分加长。不知道要怎么配合切图。

我的第一想法是用 `background` 来做，随你怎么切图，我直接填充进去就行了。

但是实际效果很明显不符合设计妹子的要求。

<div style="width: 80px; height: 68px; line-height: 68px; text-align: center; background: url(https://miao.su/images/2019/03/12/d22ea6dd07ce2041566cc.png) no-repeat 0 0 / 100% 100%;">10元</div>

## border-image

但是我隐约记得曾经看到过类似的效果，只是不记得具体的实现了，好像是用的 `background` 或者是 `border-image`。

于是在多次查找、调试 `background` 无果后，我果断转而查找了下 `border-image`。

于是发现了 `border-image-slice` 这样一个属性。

> 通过 `border-image-source` 引用边框图片后，`border-image-slice` 属性会将图片分割为 9 个区域：四个角，四个边（edges）以及中心区域。
> 四条切片线，从它们各自的侧边设置给定距离，控制区域的大小。

然后我就可以这样做

<div style="position: relative; z-index: 0; width: 80px; height: 68px; line-height: 68px; text-align: center;"><div style="width: 100%; height: 100%;">10元</div><div style="width: 100%; height: 100%; box-sizing: border-box; position: absolute; left: 0; top: 0; z-index: -1; border-width: 34px; border-style: solid; -webkit-border-image: url(https://miao.su/images/2019/03/12/d22ea6dd07ce2041566cc.png) 50% 34 repeat;border-image: url(https://miao.su/images/2019/03/12/d22ea6dd07ce2041566cc.png) 50% 34 repeat;"></div></div>


随着宽度的改变，图片也会进行拉伸，但是却不会影响到右边的圆角及内凹弧度

### 注意

1. 在 Safari 浏览器中，不能设置 `border-color: transparent;`，否则 `border-image` 会不显示。
2. 根据 MDN 的文档，`border-image-slice` 属性有一个关键字的值 *fill*。但是在 Chrome 实际测试的时候却发现并不支持，可能是暂时并未实现。（2019年3月12日，Chrome: 72.0.3626.121）

### CanIUse

![CanIUse-border-image](https://miao.su/images/2019/03/12/caniuse-border-image5eb44.png)

时间：2019年3月12日

从 CanIUse 里可以看到，`border-image` 属性已经被大部分浏览器实现了，只是其中还有一些个别的问题。

比如:
不正确的覆盖 `border-style` 属性，
不支持 `border-image-repeat: space`，
只支持简写的 `border-image`， 而不支持单独的属性（`border-image-source`, `border-image-slice`, etc）
不支持 `border-image-repeat: round`

另外使用时还需要加一个 `-webkit-` 前缀来兼容更多浏览器。

----

参考链接：

[border-image | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image)
[border-image-slice | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-slice)
[Can I Use](https://caniuse.com/#search=border-image)
