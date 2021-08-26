---
title: flex子元素的flex-shrink与min-width属性
keywords: flex,flex items,flex-shrink,flex:1,伸缩盒子,min-width,最小宽度,min-width:0,min-height,最小高度,overflow:hidden,text-overflow:ellipsis,ellipsis
description: flex-box的子元素通过flex属性设置容器尺寸的，默认情况下无法收缩子元素低于其最小尺寸，此时内部设置文本溢出省略可能失效，可通过min-width属性修正。
category:
  - 技术文章
tags:
  - CSS
date: 2021-08-26 17:50:09
updated: 2021-08-26 19:37:52
photos:
  - /images/gallery/0004.jpeg
---

工作中遇到的一个问题，在伸缩容器内，设置的文本溢出省略的样式失效了。经过精简后的代码示例如下。

```html
<!-- 无法溢出省略 -->
<div style="width:150px;display:flex;background:skyblue;">
  <div style="flex:1;">
    <p style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
      这是一段很长又不让换行的文字
    </p>
  </div>
</div>

<!-- 添加了min-width后，可以溢出省略 -->
<div style="width:150px;display:flex;background:skyblue;">
  <div style="flex:1;min-width:0;">
    <p style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
      这是一段很长又不让换行的文字
    </p>
  </div>
</div>
```

<div style="width:150px;display:flex;background:skyblue;">
  <div style="flex:1;">
    <p style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
      这是一段很长又不让换行的文字
    </p>
  </div>
</div>

<div style="width:150px;display:flex;background:skyblue;">
  <div style="flex:1;min-width:0;">
    <p style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
      这是一段很长又不让换行的文字
    </p>
  </div>
</div>

遇到问题后，在项目中找到了一处类似的且没问题的代码，发现那里有一个 `min-width:0;` 的设置，添加上去后即可解决该问题。但始终不清楚为什么，只能隐约感觉和 `flex-shrink` 有关系。

后面在网上查找了下，还真找到了这个情况，在 CSS 规范内有提到：

{% blockquote "CSS Flexible Box Layout Module Level 1" https://www.w3.org/TR/css-flexbox-1/#flex-common "7.1.1 Basic Values of flex" %}
By default, flex items won’t shrink below their minimum content size (the length of the longest word or fixed-size element). To change this, set the min-width or min-height property.
{% endblockquote %}

> 默认情况下，flex 子元素收缩时，不会低于它们的最小内容的尺寸，这个最小内容尺寸是指文本内容中最长的单词长度或固定尺寸元素。如果要更改这种情况，需要设置 `min-width` 或 `min-height` 属性。

上面的那个问题就是试图通过 `flex:1` 来收缩元素的宽度，然后内容设置溢出省略。
而 `flex:1` 是 `flex: 1 1 0` 的简写，即 `flex-grow:1;flex-shrink:1;flex-basic:0;`。
通过上面的规范，我们就知道了，`flex-shrink:1` 默认情况下不会把元素收缩到低于元素内容的最小宽度，而元素的最小宽度是多少呢？因为 `white-space:nowrap` 的关系，文本不会换行，它的最小宽度就是全部文本占据的宽度，因此文本内容也就不存在**溢出**，自然也就没有**溢出省略**了。

而设置了 `min-width:0;` 之后，改变了 `flex-shrink:1` 的默认行为，说明可以通过 `flex-shrink` 收缩最小宽度到 `0`。这时候 `flex-shrink:1` 就可以把元素收缩到与父元素同宽度了，内容也就出现了溢出省略的情况。

## 参考链接

- [Flex items and min-width:0](https://dfmcphee.com/flex-items-and-min-width-0/)
- [CSS Flexible Box Layout Module Level 1][Basic Values of flex]

[Basic Values of flex]: https://www.w3.org/TR/css-flexbox-1/#flex-common
