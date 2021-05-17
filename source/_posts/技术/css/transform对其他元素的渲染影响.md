---
en_title: CSS_Transform
title: CSS3 属性 transform 对其他元素的一些渲染影响
keywords: CSS3, transform, position, fixed, absolute, overflow, z-index, width percent
description: transform 属性会将后代元素的 fixed 定位效果降级到 absolute，还有提升元素层级的效果，同时还会影响 absolute 定位元素在 overflow 属性不为 visible 内的表现以及宽度百分比的容器基准。
date: 2019-3-5 10:18:22
updated: 2021-5-11 21:12:40
category:
  - 技术文章
tags:
  - CSS
photos:
  - http://img.wayowe.com/blog_gallery/ab_019.jpg@gallery
---

一个偶然的情况下，发现了这样一个问题：

> 给一个设置了 *transform* 属性的元素的子元素设置 `position: fixed`，实际表现却并非 *fixed* 定位的效果。

<p class="codepen" data-height="300" data-theme-id="36319" data-default-tab="css,result" data-user="moesuiga" data-slug-hash="PLbMza" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="PLbMza">
  <span>See the Pen <a href="https://codepen.io/moesuiga/pen/PLbMza/">
  PLbMza</a> by 王由伟(wangyouwei) (<a href="https://codepen.io/moesuiga">@moesuiga</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

之后在搜资料的时候看到了这样一篇文章 [CSS3 transform对普通元素的N多渲染影响 «  张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/)

里面介绍了 *transform* 属性的多种影响，然后才知道，原来 *transform* 属性有这么多值得注意的地方。

1. transform 提升元素的垂直地位，类似添加了 `position: relative;` 的效果。

    两个元素如果有 *margin* 负值，然后出现部分重叠的时候，在没有 *static* 以外的定位时，都是后面的元素覆盖前面的元素，这样后来居上的渲染。

    可是如果这时候，给前面的元素添加了 *transform* 属性，就会发现，原本应该被覆盖的前面的元素，反而覆盖了后面的元素。

    这就是 *transform* 带来的垂直提升效果。

2. transform 限制 `position: fixed;` 的跟随效果，也就是我最初发现的问题点。

3. transform 改变 *overflow* 对 *absolute* 定位元素的限制。

    `position: absolute;` 绝对定位的元素，如果有一个 *overflow* 不为 *visible* 的祖先元素，并且这个祖先元素一直到定位的元素之间的所有嵌套元素都没有设置了非 *static* 的 *position* 属性，那么祖先元素的 *overflow* 属性对该定位元素不起作用。

    这一点是我们的一贯认知，但是加了 *transform* 的话，就会改变这一点，致使 *absolute* 定位的元素也会被 *overflow* 影响。

4. transform 限制 *absolute* 定位元素的 *100%* 宽度大小。

    我们都知道 *absolute* 定位元素的宽度百分比是基于该元素最近的带有非 *static* 定位属性的祖先元素的宽度。

    可是如果在这两个元素之间插入一个带有 *transform* 属性的元素，就会改变这一状况，使得 *absolute* 定位元素的宽度百分比基于 *transform* 元素，而非外部带有定位属性的祖先元素。

上面四点就是张鑫旭大神的文章中提到的几点影响。

然后我在实践过程中，发现了第5点影响：

> 5、transform 会限制 *absolute* 定位元素的定位基准。

我们知道有那么几个方位属性是跟定位紧密结合的: *top*、*right*、*bottom* 以及 *left*。

*absolute* 定位元素的方位属性就是基于其 *包含块* 的边界来处理的。

一般来说，*absolute* 定位的元素，其包含块就是距离该元素最近的带有非 *static* 定位的祖先元素。
然而 *transform* 就可以改变这一点，使得 *absolute* 的方位属性以 *transform* 元素的边界来处理。
当然，前提条件是带有 *transform* 属性的元素和带有 *absolute* 定位的元素之间没有其他带有非 *static* 定位属性的元素。

啰嗦这一堆好像有点绕，还是直接上效果看的方便。

<p class="codepen" data-height="300" data-theme-id="36319" data-default-tab="css,result" data-user="moesuiga" data-slug-hash="ZPLEJm" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="ZPLEJm">
  <span>See the Pen <a href="https://codepen.io/moesuiga/pen/ZPLEJm/">
  ZPLEJm</a> by 王由伟(wangyouwei) (<a href="https://codepen.io/moesuiga">@moesuiga</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

可以看到，在示例中，最里面的 *absolute* 定位元素是定位在了右上角，而中间的 `.transform` 并没有定位属性。

按照常理来想，黑色方块部分应该是定位在红色边框盒子的右上角的，可实际上其却被 *transform* 属性限制在了蓝色边框的盒子里，定位在了蓝色边框的盒子右上角。

结合上面第 4 点，*transform* 属性其实就是截断了 *absolute* 寻找其包含块的正常路径，使其本身成为了 *absolute* 定位元素的包含块。

----

参考链接：

- [CSS3 transform对普通元素的N多渲染影响 «  张鑫旭-鑫空间-鑫生活](https://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/)
