---
en_title: nth-child_and_nth-of-type
title: 关于 nth-child 和 nth-of-type 选择器
keywords: CSS, nth-child, nth-of-type, pseudo class, 伪类选择器
date: 2018-05-22 16:45:51
updated: 2021-5-11 21:35:58
category:
  - 技术文章
tags:
  - CSS
photos:
  - /images/gallery/ab_005.png
---

## 首先是二者的区别

`:nth-child(n)` 是选择父元素的第 n 个子元素。
`:nth-of-type(n)` 是选择父元素的第 n 个**同类型**的子元素

举个例子：

```html
  <div>
    <h1>title1</h1>
    <p>paragraph1</p>
    <p>paragraph2</p> <!-- 设为红色 -->
  </div>
```

```css
/* nth-child */
p:nth-child(3) {
  color: red;
}
/* nth-of-type */
p:nth-of-type(2) {
  color: red;
}
```
<!-- more -->
结果：
![样式结果](https://miao.su/images/2019/06/19/_15609154508763ed306.png)

如果改为

```css
p:nth-child(2) {
  color: red;
}
```

结果：
![p:nth-child(2)的结果](https://miao.su/images/2019/06/19/_15609155282272016.png)

`p:nth-child(2)` 选择的是第 2 个子元素，且是 p 元素。（先找第 2 个，再找是不是 p）
`p:nth-of-type(2)` 则是选择第 2 个为 p 的子元素。（先找 p，再找第 2 个）

## 使用类名的时候（重点）

平时写样式的时候，直接使用标签名还是比较少的，最多的还是类名。
`.class:nth-child(n)`还是一样，选择第 n 个子元素，且含有`.class`类名的元素。（虽然结果是这样，但这个说法还是不准确的，其实就是一个交集选择器，写成`:nth-child(n).class`就容易理解了吧，大概）

但是`.class:nth-of-type(n)`是否也是选择第 n 个同类名的元素呢？

_我之前一直是这么以为的，而且因为使用的时候没出现过差错，所以就想当然的认为是没错的。_

**所以，是的，这是不对的。**

找了很多说明这两个选择的使用的介绍，但都没有说过与类名结合起来的使用。这里做一个踩坑的记录。

先说结论吧：

> `.class:nth-of-type(n)` 匹配的时候，是寻找到`.class`所在的标签，然后匹配`element:nth-of-type(n).class`的即先找到有`.class`类的标签，然后匹配第 n 个该标签的子元素，然后还要求匹配到的元素类名为`class`

举个例子：

```html
  <div>
    <h1>title1</h1>
    <p class="test">paragraph1</p>
    <p class="test2">paragraph2</p>
    <span class="test">span1</span>
    <span class="test test2">span2</span> <!-- 设为红色 -->
  </div>
```

```css
.test:nth-of-type(2) {
  color: red;
}
```

结果：
![.test:nth-of-type(2)的结果](https://miao.su/images/2019/06/19/_15609156289249143e8.png)

如果改成`.test2:nth-of-type(2)`呢？
![.test2:nth-of-type(2)的结果](https://miao.su/images/2019/06/19/_15609156653718e0076.png)

第 2 个`p.test2`也成了红色。

### 总结

要总结的话，应该是说`:nth-child`和`:nth-of-type`只会对标签生效，加上类名只是普通的**交集选择器**。就好像`.a.b`这样的选择器一样，只不过`.class:nth-of-type`这样的写法容易引起误会罢了。（我就深受其害啊，o(╥﹏╥)o）

### 补充猜想：

> 很可能所有的伪类选择器，甚至还有伪元素选择器都只对标签生效。
