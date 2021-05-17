---
en_title: Sass_and_SCSS
title: 【转】Sass 与 SCSS 的异同
keywords: CSS, Sass, SCSS, CSS预处理器, PreCSS
description: Sass 是一种 CSS 的预处理语言，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发变得简单和可维护。SCSS 是 Sass 引入的新语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。
date: 2018-1-4 09:24:18
updated: 2021-5-11 21:32:01
category:
  - 技术文章
tags:
  - CSS
  - Sass
  - SCSS
photos:
  - http://img.wayowe.com/blog_gallery/ab_020.jpg@gallery
---

本篇系转载文章

原文：[https://segmentfault.com/a/1190000005646206][原文地址]
作者：[MrDream][原文作者]

以下是内容：

## Sass 与 SCSS 是什么关系？
2016年06月04日发布

我最近写了很多 Sass 代码，但是最近发现并不是每一个人都知道 Sass 具体是什么。下面是一个简短的说明：

当我们说起 Sass ，我们经常指的是两种事物：一种 css 预处理器和一种语言。我们经常这样说，“我们正在使用 Sass”，或者 “这是一个 Sass mixin”。同时，Sass （预处理器）有两种不同的语法：

<!-- more -->
- Sass,一种缩进语法
- SCSS,一种 CSS-like 语法

### 历史

最开始，Sass 是Haml的一部分，Haml 是一种预处理器，由 Ruby 开发者设计和开发。因为这样，Sass 使用类似 Ruby的语法，没有花括号，没有分号，具有严格的缩进，就像这样：

```sass
// Variable
!primary-color= hotpink

// Mixin
=border-radius(!radius)
    -webkit-border-radius= !radius
    -moz-border-radius= !radius
    border-radius= !radius

.my-element
    color= !primary-color
    width= 100%
    overflow= hidden

.my-other-element
    +border-radius(5px)
```

你可以就看到，这和CSS代码有很大的区别！即使你是一个 Sass（预处理器） 用户，你也会发现这和你正在使用的有很大的差别。变量的标志用 `!`，而不是`$`,分配符是`=`而不是`:`。非常怪异。

但是在2010年五月之前，Sass 就是这个样子的。2010年5月，官方推出了一个全新的语法，被叫做 SCSS，意思是 Sassy CSS。这个语法带来了对 CSS 友好的语法，试图弥合 Sass 和 CSS 之间的鸿沟。

```scss
// Variable
$primary-color: hotpink;

// Mixin
@mixin border-radius($radius) {
    -webkit-border-radius: $radius;
    -moz-border-radius: $radius;
    border-radius: $radius;
}

.my-element {
    color: $primary-color;
    width: 100%;
    overflow: hidden;
}

.my-other-element {
    @include border-radius(5px);
}
```

SCSS 和 Sass 相比更加贴近 CSS 语法。也就是说，Sass 维护者做了大量的工作，把缩进语法中的`!`和`=`换成了 SCSS 中的 `$` 和 `:`。

现在，在开始一个新项目时，你也许疑惑要用哪种语法。让我们来看看两种语法的优劣。

### Sass缩进语法的优劣

虽然语法看起来怪异，但是缩进语法有很多有趣的点。首先，它 更短并且更易于书写。没有花括号，没有分号，你完全不需要这些东西。更好的是，你甚至不需要`@mixin` 或者 `@include`, 一个字符就足够了：`=` 和 `+`。

同时 Sass 通过严格的缩进来强制 **clean coding standards**。因为一个错误的缩进就会破坏整个.sass文件，这使得整个代码总是clean 和格式良好的。只有一种写 Sass 代码的方式：正确的方式。

但是请注意！缩进在 Sass 中是有意义的。当你缩进了一个元素，这意味这你将它变为了之前元素的子元素。比如:

```sass
.element-a
    color: hotpink

    .element-b
        float: left
```

以上会输出下面的 CSS 代码：

```css
.element-a {
    color: hotpink;
}

.element-a .element-b {
    float: left;
}
```

将 `.element-b` 向右一格意味着它变成了 `.element-a` 的子元素，改变了输出 CSS 代码的结果。所以一定要小心你的代码缩进。

另外，我觉得基于缩进的语法适合于 Ruby/Python 团队，而不适合 PHP/Java 团队。（这是值得商榷的，我也希望听到不同的声音）

### SCSS语法的优劣

对于初学者，SCSS 是完全和 CSS 兼容的，这意味着几乎为零的学习曲线。SCSS语法即是：它只是加了一些功能的 CSS。当你和没经验的开发者一起工作时这很重要：他们可以很快开始编码而不需要首先去学习Sass。

此外，SCSS 还是 **易于阅读** 的，因为它是有语义的，而不是用符号表示。当你读到 `@mixin`，你就会知道这是一个 mixin 声明；当你看到 `@include` ，你就是在引用一个 mixin。他并没有用任何缩写，当你大声读出来时所有的都很明了。

还有，现在几乎所有 Sass 的工具，插件和 demo 都是基于 SCSS语法来开发的。随着时间过去，SCSS 会变成大家首选的选择。比如，你现在很难找到一个 Sass 缩进语法的高亮插件，通常都只有 SCSS 的可以用。

### 总结

如何选择取决于你，但是除非你有很好的理由一定要使用缩进的语法，我强烈推荐使用 SCSS 。不仅仅它很简单，同时他也很方便。

最后请注意 Sass 从来没有大写过，无论你指的是语法或者这个语言。同时， SCSS 一直是大写的。甚至有一个网站专门来提醒你这件事! [SassnotSASS.com](http://SassnotSASS.com/)

> 翻译自 [What’s the Difference Between Sass and SCSS?][英文原地址]

-----
[原文地址]: https://segmentfault.com/a/1190000005646206
[原文作者]: https://segmentfault.com/u/mrdream
[英文原地址]: https://www.sitepoint.com/whats-difference-sass-scss/
