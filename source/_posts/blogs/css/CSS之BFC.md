---
en_title: CSS_BFC
title: CSS之BFC
keywords: CSS, BFC, Block Formatting Context, 清除浮动, 自适应盒子
description: BFC 是一个独立的渲染区域，只有块级元素参与，它规定了内部的块级元素如何布局，并且与这个区域外部毫不相干。BFC内部的任何布局都不影响其外部区域。
category:
  - CSS
tags:
  - BFC
date: 2017-07-17 20:40:21
photos:
  - https://miao.su/images/2019/01/12/02342bf5.jpg
---

BFC(*Block Formatting Context 块级格式化上下文*)是一个独立的渲染区域，只有块级元素参与，它规定了内部的块级元素如何布局，并且与这个区域外部毫不相干。

直白地说就是：BFC内部的任何布局都不影响其外部区域。

<!-- more -->

这样对前端布局来讲会非常的友好，那么哪些元素能产生 BFC 呢？

只要给元素添加如下属性就可以触发 BFC

- float 属性不为 none

- position 属性为 absolute 或 fixed

- display 为 inline-block、table-cell、table-caption、flex、inline-flex

- overflow 不为 visible


## BFC 元素所具有的特性

- 在 BFC 中，盒子从顶端开始垂直地一个接一个地排列。
- 盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻盒子的margin会发生重叠。
- 在 BFC 中，每一个盒子的左外边缘（margin-left）会触碰到容器的左外边缘（border-left），对于从右到左的格式来说，则触碰到右边缘。
- BFC 的区域不会与浮动盒子产生交集，而是紧贴浮动边缘。
- 计算 BFC 的高度时，自然也会检测浮动的盒子高度。

## BFC 的主要用途

### 清除元素内部浮动

只要把父元素设为 BFC 就可以清理子元素的浮动了，最常见的用法就是在父元素上设置 `overflow: hidden;` 样式，对于 IE6 加上 `zoom: 1;` 就可以了。

主要用到 BFC 特性之5：
计算 BFC 的高度时，自然也会检测浮动的盒子高度

### 解决外边距合并问题

主要用到 BFC 特性之2：
盒子垂直方向的距离由margin决定，属于同一个BFC的两个相邻盒子的margin会发生重叠
属于同一个 BFC 的两个相邻盒子的margin会发生重叠，那么我们创建不属于同一个 BFC 的盒子，就不会发生margin重叠了。

### 制作右侧自适应的盒子

主要用到 BFC 特性之4：
BFC 的区域不会与浮动盒子产生交集，而是紧贴浮动边缘
普通流体元素 BFC 后，为了和浮动元素不产生任何交集，顺着浮动边缘形成自己的封闭上下文

## 总结

BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。包括浮动，和外边距合并等等，因此，有了这个特性，我们布局的时候就不会出现意外情况了。
