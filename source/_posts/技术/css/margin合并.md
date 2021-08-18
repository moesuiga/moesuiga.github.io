---
title: 《CSS世界》学习笔记——margin合并
keywords: CSS, margin, margin合并
description: 身为一个前端开发人员，有关 margin 会出现合并的现象这一点，或多或少应该都是知道一些的。只是在这之前，我仅仅是知道两个相邻的兄弟元素之间的上下 margin 值会发生重叠，最终结果取更大的 margin 值，以及子元素的 margin-top 值会溢出到父元素上面；这种程度的浅显认知。
date: 2021-08-18 10:12:54
updated: 2021-08-18 12:08:25
category:
  - 技术文章
tags:
  - CSS
photos:
  - /images/gallery/0003.jpg
---

> 以下内容为读《[*CSS世界*][css-world]》4.3章 激进的margin属性 的记录
> 《[*CSS世界*][css-world]》——作者：[张鑫旭][zhangxinxu]

## 出现margin合并的几种情况

1. 相邻兄弟元素 [示例][margin-combine-sibling]
2. 父级元素和第一个/最后一个子元素 [示例][margin-combine-father-son]
3. 空块级元素 [示例][margin-combine-blank]

第1种情况是大部分人所熟知也最常见的情况，甚至被很多人称为 *bug*。我曾经也是这么理解的人之一。
不过看了[张鑫旭][zhangxinxu]的《[*CSS世界*][css-world]》中的讲述后，虽然从其说明中并未提到**规范**、**标准**之类的字眼，但我依然愿意相信他的说法更加贴近实际情况。

> CSS世界的CSS属性是为了更好地进行图文信息展示而设计的，博客文章或新闻信息是图文信息的典型代表，基本上离不开下面这些HTML
> ```html
> <h1>文章标题</h1>
> <p>文章段落1…</p>
> <p>文章段落2…</p>
> <ul>
>   <li>列表1</li>
>   <li>列表2</li>
>   <li>列表3</li>
> </ul>
> ```
> ……
> 对于兄弟元素的margin合并其作用和em类似，都是让图文信息的排版更加舒服自然。假如说没有margin合并这种说法，那么连续段落或列表之类首尾项间距会和其他兄弟标签成1:2关系；文章标题距离顶部会很紧，而和下面的文章详情内容距离又会很开，就会造成内容上下间距不一致的情况。这些都是糟糕的排版体验。而合并机制可以保证元素上下间距一致，无论是`<h2>`标题这种margin偏大的元素，还是中规中矩的`<p>`元素

## margin合并的计算规则

说明：这里的计算规则是[张鑫旭][zhangxinxu]的个人总结，而非是明确的规范定义。

1. **正正取大值**：如果合并的两个margin都是正数，则结果是其中的大值 [示例][margin-combine-rule-positive-positive]
2. **正负值相加**：如果合并的两个margin一个为正，另一个为负，则结果是两数相加 [示例][margin-combine-rule-positive-negative]
3. **负负最负值**（或者**负负取小值**）：如果合并的两个margin都是负值，则结果取其中的小值（绝对值大的那个数） [示例][margin-combine-rule-negative-negative]


[zhangxinxu]: https://www.zhangxinxu.com/
[css-world]: https://item.jd.com/12262251.html
[margin-combine-sibling]: https://wayowe.com/demos/css-world/margin-combine-1.html
[margin-combine-father-son]: https://wayowe.com/demos/css-world/margin-combine-2.html
[margin-combine-blank]: https://wayowe.com/demos/css-world/margin-combine-3.html
[margin-combine-rule-positive-positive]: https://wayowe.com/demos/css-world/margin-combine-rule-1.html
[margin-combine-rule-positive-negative]: https://wayowe.com/demos/css-world/margin-combine-rule-2.html
[margin-combine-rule-negative-negative]: https://wayowe.com/demos/css-world/margin-combine-rule-3.html
