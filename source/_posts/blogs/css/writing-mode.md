---
title: CSS 属性 `writing-mode` 的妙用
date: 2019-12-11 17:42:23
keywords: CSS, flex, writing-mode, 横向滚动
description: 纯 CSS 样式实现自上而下从左到右多行纵向排列并横向滚动
category:
  - CSS
tags:
  - style
photos:
  - https://s2.ax1x.com/2019/12/25/li7qr6.md.jpg
updated: 2019-12-26 11:40:34
---

纵向的滚动写多了，来看看横向的滚动吧。而且不是普通的一行同级元素，而是多行同级元素自上而下排列的横向滚动。

## flex 布局

可以通过结合 `flex-direction: column` 和 `flex-wrap: wrap` 来达成。

就像下面这样:

<p class="codepen" data-height="383" data-theme-id="36319" data-default-tab="css,result" data-user="moesuiga" data-slug-hash="ZEYyeQO" style="height: 383px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="[CSS] flex 实现多行纵向排列并横向滚动">
  <span>See the Pen <a href="https://codepen.io/moesuiga/pen/ZEYyeQO">
  [CSS] flex 实现多行纵向排列并横向滚动</a> by 王由伟(wangyouwei) (<a href="https://codepen.io/moesuiga">@moesuiga</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

但是这里有一点需要注意的地方：**`display: flex` 的容器盒子必须要给定一个宽度**。
如果没有设置宽度的话，容器是不会被容器给撑开的。

这对于静态内容来说也无所谓，不就是要个宽度吗，给设置一个就是了。
可是当内容是动态改变的呢？比如内容列表是由接口返回的，数量不定？比如来一个触底加载更多？
这时候要怎么办呢？

当然，你可以通过js来计算一下，一般这种情况，子元素 item 都是定宽定高的，容器肯定也是定高的，所以每列能放几个 item 也是可以计算得出的，然后总的 item 数量你也知道，那么就能计算出总共要放多少列，然后就能得出容器的宽度应该设置为多少了。

但是如果可以只使用 CSS 样式来完成的话，又何必使用 js 计算的方式呢？要知道 *能使用 CSS 解决的问题，就不要用 js 来解决*。

## writing-mode

在 CSS 中有这样一个属性: [`writing-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/writing-mode)

> 它定义了文本水平或垂直排布以及在块级元素中文本的行进方向。

一般我们会使用它来更改文字的排列，比如我们一般看的文字都是水平方向，从左到右，自上而下的顺序。
但是偶尔可能会需要排布一个垂直方向自上而下，从右到左的顺序，就像古时竹简上书写内容的顺序一样。

就像下面这样

<p class="codepen" data-height="503" data-theme-id="36319" data-default-tab="result" data-user="moesuiga" data-slug-hash="ExaXEXj" style="height: 503px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="writing-mode更改文字排版">
  <span>See the Pen <a href="https://codepen.io/moesuiga/pen/ExaXEXj">
  writing-mode更改文字排版</a> by 王由伟(wangyouwei) (<a href="https://codepen.io/moesuiga">@moesuiga</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

> 此属性指定块流动方向，即块级容器堆叠的方向，以及行内内容在块级容器中的流动方向。
> 因此，它也确定块级内容的顺序

也就是说，`writing-mode` 属性除了上面那种更改文字排版的用法以外，我们还可以用它来更改块级内容的排版。

因此，我们就可以这样做。

## flex 结合 writing-mode

flex 元素定高不定宽，由子元素来撑开宽度。

<p class="codepen" data-height="358" data-theme-id="36319" data-default-tab="css,result" data-user="moesuiga" data-slug-hash="LYELxbR" style="height: 358px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="[CSS] flex 结合 writing-mode 实现多行纵向排列并横向滚动">
  <span>See the Pen <a href="https://codepen.io/moesuiga/pen/LYELxbR">
  [CSS] flex 结合 writing-mode 实现多行纵向排列并横向滚动</a> by 王由伟(wangyouwei) (<a href="https://codepen.io/moesuiga">@moesuiga</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
