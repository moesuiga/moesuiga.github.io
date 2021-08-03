---
title: 使用 TextEncoder 获取字符串的字节数
keywords: Bytes, 字节数, TextEncoder
description: JavaScript 获取字符串的字节数
date: 2020-5-12 12:56:40
updated: 2021-5-11 08:54:08
category:
  - 技术文章
tags:
  - JavaScript
photos:
  - /images/gallery/2020051201.png
---

之前有同事因为一段文本超出规定字节数，询问过我，怎么知道一段文字有多少个字节。
当时只是简单的回他一般英文与数字每个字符占一个字节，而中文字符占多少个字节需要根据字符编码来判断。比如中国的GBK/GB2312/GB18030等，一个中文字符就是两个字节；而现在主流的编码方式UTF-8中，一个中文字符则是三个字节。

<!-- more -->

## TextEncoder

后来无意中在 MDN 里看到这么一个方法，可以将一段文本字符生成采用UTF-8编码的字节流（它还有一个作用相反的配套方法 TextDecoder）。如此很简单的一个查询字符串字节数的方法就出来了。

```js
const encoder = new TextEncoder();
const view = encoder.encode('一');
console.log(view); // Uint8Array(3) [228, 184, 128]
console.log(view.length); // 3
```

> 原本 TextEncoder 还应该有一个参数 encoding，可以指定编码，但是因为标准规定 encoding 始终返回 "utf-8"，所以只能获取到UTF-8编码下的字符串的字节数。
> 不过 [GitHub](https://github.com/inexorabletash/text-encoding) 上倒是有一个polyfill支持非utf-8的编码。

```js
const enc = new TextEncoder('gbk');
enc.encoding; // utf-8
enc.encoding = 'gbk';
enc.encoding; // utf-8
```

## 后续

### String.property.codePointAt/String.fromCodePoint

随着查询字符编码，还让我了解了一个字符串的方法 `String.property.codePointAt`。

这个方法的作用类似于 `String.property.charCodeAt`，都是返回字符串某一位置的字符代码点的值，用法也和 `String.property.charCodeAt` 一样。

```js
var str = '笑一笑😀';
str.charCodeAt(0);  // 31505
str.codePointAt(0); // 31505
```

那么它们的区别是什么？这里就要说到*四字节*的字符了。

我们平时使用的Unicode编码字符，都是 U+0000 - U+FFFF 来标识的。而 U+FFFF 则是三字节能表示的最大字符数了，那么四字节要怎么标识呢？答案是用两个Unicode字符来标识，比如上面的笑脸emoji😀，它的Unicode编码其实是 `\ud83d\ude00`，而且其长度为2。

```js
'😀'.length === 2; // true
```

像这样用两个Unicode字符来标识的四字节字符，是无法使用 `String.property.charCodeAt` 来获取其完整代码点的，该方法只能获取到一个Unicode代码单元的代码点，即`String.property.charCodeAt`只能获取一个长度的Unicode的字符代码点。
而要获取这种四字节字符的完整代码点，则要使用 `String.property.codePointAt` 。

```js
var str = '笑一笑😀';
str.charCodeAt(3);  // 55357 => 其实就是 '\ud83d' 的代码点
str.codePointAt(3); // 128512
```

就如同 `String.property.charCodeAt` 有一个对应的方法 `String.fromCharCode`，`String.property.codePointAt` 也有一个对应的从代码点得到对应字符的方法 `String.fromCodePoint`。

```js
String.fromCodePoint(128512); // 😀
```

## 参考链接

- [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)
- [TextDecoder](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder)
- [String.property.codePointAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)
- [String.property.charCodeAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
- [中文汉字占二个字节还是三个字节长度](https://blog.csdn.net/yaomingyang/article/details/79374209)
