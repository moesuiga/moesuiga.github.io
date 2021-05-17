---
en_title: The_Different_Between_undefined_And_null
title: JavaScript中undefined与null的区别
keywords: js, javascript, undefined, null
description: 在 JavaScript 中，undefined 与 null 都是用来表示空值的，那么它们的区别有哪些呢？
category:
  - 技术文章
tags:
  - JavaScript
date: 2019-7-9 13:59:33
updated: 2021-5-11 08:54:59
photos:
  - /images/gallery/2019070901.png
---

前几天，朋友在看 JavaScript 关键字的时候，发现了这样一个小问题：

> `undefined` 和 `null` 都不是关键字，但是为什么 `undefined` 可以作为变量名赋值，而 `null` 却不行？

```js
var undefined = 1;
undefined = 2;

var null = 1; // SyntaxError: Unexpected token null
null = 2; // ReferenceError: Invalid left-hand side in assignment
```

基于此，我查找了一下 MDN 文档，并记在了这里。

在 JavaScript 中，`undefined` 与 `null` 都是用来表示空值。

```js
undefined == null; // true
```

所以上面通过 `==` 进行比较时，是相等的。可是毫无疑问的，这两者并不是完全相同的。

```js
undefined === null; // false
```

## 1. 具体含义

首先，二者在语义方面的不同。

- `undefined` 是表示未赋值的一个状态
- `null` 则是表明该值被赋予了一个空值

也就是说，一个变量 *x* 为 `undefined` 时，意为：变量 *x* 还没有被赋予某个值。
而变量 *x* 为 `null` 时，则意为：变量 *x* 被显式的赋予了一个空值。

## 2. 类型

- 在类型上，`undefined` 是 JavaScript 中的基础类型之一；而 `null` 则是一个值，一个常量，类似数字 1, 2, 3 …… 这样的常量。

- 同时，`undefined` 还是一个全局变量，其值就是 *undefined*，即 `window.undefined === undefined`。

> 自ECMAScript5标准以来undefined是一个不能被配置（non-configurable），不能被重写（non-writable）的属性。

不过实际上你可以对 `undefined` 重新赋值，只是在**全局作用域**下这并不会改变 `undefined` 的值。
而在块级作用域及函数作用域中，是可以改变 `undefined` 的值的。**但不建议这样重写 `undefined` 的值，也应当避免这种做法。**

```js
var undefined = 1;
undefined; // undefined

{
  let undefined = 2;
  undefined; // 2
}

function changeUndefined() {
  var undefined = 3;
  return undefined;
}
changeUndefined(); // 3
```

而 `null`，本身作为一个值，那它就无法被赋值，即 `null` 无法作为一个变量名来使用。就像你不能写 `var 1 = 2` 这样。

---
参考资料：

- [ReferenceError: invalid assignment left-hand side - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Invalid_assignment_left-hand_side)
- [null - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)
- [undefined - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
