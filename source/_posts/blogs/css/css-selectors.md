---
en_title: CSS_Selectors
title: CSS选择器
keywords: CSS, selectors, CSS选择器
description: CSS选择器的大致整理
date: 2018-1-11 16:57:12
category:
  - CSS
tags:
  - selectors
photos:
  - https://miao.su/images/2019/02/23/11899c64.jpg
---

CSS-*Cascading Style Sheet(层叠样式表)*，给HTML元素添加各种样式的文件。CSS选择器就是用来匹配要添加样式的元素的。
<!-- more -->
[W3school](http://www.w3school.com.cn/cssref/css_selectors.asp)

按照我个人的理解，将其分为：

- [基础选择器](#基础选择器)
- [属性选择器](#属性选择器)
- [伪类、伪元素选择器](#伪类、伪元素选择器)
- [组合选择器](#组合选择器)

### 基础选择器

基础选择器就相当于选择器的基础组成部分一样。

- 通配符选择器(*)
  匹配所有的标签，但权重最低(比继承高)

- 标签(元素)选择器(tag/element)
  匹配对应的标签。
  *tips*: 标签就是元素，元素就是标签，不同的叫法而已

- 类选择器(.class)
  选择属性`class`中有对应名称的元素

- ID选择器(#id)
  选择属性`id`中有对应名称的元素

其实属性选择器应该也可以归为基础选择器，但是因为属性选择器里有多种匹配模式，所以单独提出来了。

### 属性选择器

属性选择器一般都会与其他选择器组合使用。

- [attribute]
  选择具有`attribute`属性的元素

- [attribute=value]
  选择具有属性`attribute`且值为`value`的元素

- [attribute~=value]
  选择属性`attribute`中含有单词`value`的元素

- [attribute|=value]
  选择属性`attribute`以单词`value`开头的元素

- [attribute*=value]
  选择属性`attribute`中包含字符串`value`的元素

- [attribute^=value]
  选择属性`attribute`以字符串`value`开头的元素

- [attribute$=value]
  选择属性`attribute`以字符串`value`结尾的元素

#### [attribute~=value]与[attribute*=value]的区别

`[attribute~=value]`匹配的是*单词*，表示的是某个属性attribute的值里有value这个词，而`[attribute*=value]`匹配的是*字符串*，表示attribute的值里包含value这串字符。

举个例子：

```css
[class~=err] {
  font-weight: bold;
}
[class*=err] {
  color: red;
}
```

```html
<div class="error">
  错误信息
</div>
<div class="err or">
  另一条
</div>
```

上面的例子中`[class~=err]`并不会选中`class="error"`只会选中`class="err or"`，而`[class*=err]`则两个都能选中。

也就是说`[attribute~=value]`是以*单词*为度量进行匹配，而`[attribute*=value]`则以*字符串*的形式进行匹配，不论是否是完整的一个单词。

> 同样的`[attribute|=value]`与`[attribute^=value]`的区别也是如此。

### 伪类、伪元素选择器

`伪类/伪元素`就是一种拥有类似`类/元素`的性质却又不是`类/元素`的东西。一般的，伪类选择器以`:`开头，伪元素选择器以`::`开头。

> 伪类、伪元素选择器一般不会单独使用，而是与其他选择器组合在一起使用。

- `:before/:after/::before/::after`
> tips: `:before/:after`与`::before/::after`实际上的用法完全相同，之所以一个是伪类一个是伪元素只是不同时期的归类不同而已。
> 早期将其归类为*伪类*，而后来则归为了*伪元素*。
> 不过现代浏览器也支持伪类写法，所以如果需要兼容旧版浏览器的话，可以直接以伪类形式书写。
> 另外该选择器有一个必须的样式属性`content`，否则该选择器不生效。

    + `:before/::before`在某个元素的内容之前插入
    + `:after/::after`在某个元素的内容之后插入

- `:link/:visited/:active/:hover/:focus`
    + `:link`用于选择未被访问过的链接
    + `:visited`用于选择已被访问过的链接
    + `:active`用于选择活动**元素**(即当前选中的元素，直观点表达就是按下鼠标不松开的状态)
    + `:hover`用于选择鼠标悬浮于其上的**元素**(即鼠标指针指向的元素)
    + `:focus`用于选择获得焦点的**可获取焦点的元素**(一般是表单元素和超链接)

- `:first-letter/:first-line`
    + `:first-letter`选择首字母，中文下选择首字
    + `:first-line`选择首行

- 子元素伪类(需要有父元素)
    + `:first-child`选择首个子元素
    + `:last-child`选择最后一个子元素
    + `:nth-child(n)`选择第n个子元素
    > 可以使用数学表达式来选择多个子元素。
    > 如：`:nth-child(n + 2)`选择第2个以后的子元素，`nth-child(2n)`选择偶数子元素
    > 还可以使用负数表示：`nth-child(-n + 2)选择最后两个
    + `nth-last-child(n)`同上，从最后一个开始计数
    + `:only-child`选择唯一的子元素
    + `:first-of-type`选择首个(某一类型的)子元素
    + `:last-of-type`选择最后一个(某一类型的)子元素
    + `:nth-of-type(n)`选择第n个(某一类型的)子元素
    + `:nth-last-of-type(n)`同上，从最后一个开始计数
    + `:only-of-type`选择唯一的(某一类型的)子元素

> `child`与`of-type`的区别：
> `child`是包含所有子元素进行计算的，
> 而`of-type`则只包含先通过与其组合的其他选择器匹配后得到的子元素，而非全部子元素。

- 其他
    + `:root`选择根元素，HTML里的根元素就是`html`标签
    + `:lang(language)`选择带有以`language`开头的`lang`属性值的元素
    > 如：`p:lang(it)`表示选择带有以`it`开头的`lang`属性的p元素
    + `:empty`选择没有子元素(包括文本节点)的元素
    + `:target`选择当前活动的元素(url中的锚点指向的ID元素)
    + `:enabled`选择启用的元素
    + `:disabled`选择禁用的元素
    + `:checked`选择被选中的元素
    + `:not(selector)`选择不是selector选中的元素
    + `::selection`选择被用户选取的元素部分
    > 应用了`:first-letter`样式的元素，不会应用`::selection`的样式

### 组合选择器

顾名思义，组合选择器就是由两个或多个基础选择器组合成的选择器。

> 以下用a, b, ... 等表示基础选择器

- 并集选择器(a, b)
- 交集选择器(ab)
- 兄弟选择器(a ~ b)
- 直接兄弟选择器(a + b)
- 父子选择器(a > b)
- 后代选择器(a b)
- 其他由以上多种选择器进行组合的选择器(a > b c, d + e f ~ g)

> 注意后代选择器之间是**有空格**的，而交集选择器之间是**没有空格**的
> `a ~ b`是选择与a元素同级的后面所有的b元素，
> 而`a + b`则是选择紧跟着a元素后面的b元素，如果a元素后面的元素不是b，则不匹配
