---
en_title: JavaScript_Convert_To_Number
title: JavaScript 其他类型转换为数字类型的方式
keywords: JavaScript, JS, Transfer Number, 转换数字类型
description: 记录一些JavaScript中的数据类型转换——数字类型
date: 2018-12-19 17:41:59
updated: 2021-5-11 21:18:49
category:
  - 技术文章
tags:
  - JavaScript
photos:
  - http://img.wayowe.com/blog_gallery/ab_022.jpg@gallery
---

一般情况下，在 JavaScript 中把其他类型转换为数字类型时，遵循以下规则。

1. 如果是 `undefined`，返回 `NaN`。
2. 如果是 `null`，返回 +0。
3. 如果是布尔值，那么 true 转为 1，false 转为 +0。
4. 如果是数字，直接返回原值
5. 如果是字符串
  1. 如果是完全由数字组成的字符串，直接返回字面量对应的数字
  2. 如果是有数字+非数字组成的字符串
    1. 以 `0x`、`0X`、`0o`、`0O`、`0b`、`0B`开头的数字，会尝试分别根据 16进制、8进制、2进制来转换为十进制数字。如果有超出进制范围的字符，则返回 `NaN`
    2. 除情况1之外的，`Number()`、`+/-`、 `- 0` 、 `* 1` 等操作会返回 `NaN`
    3. `parseInt/parseFloat` 会返回最前面作为数字的部分
    4. 其他情况根据实际方法返回，一般会返回 `NaN`
6. 如果是Symbol类型 (ES6新增类型)，抛出类型异常 `TypeError: Cannot convert a Symbol value to a number`
7. 如果是对象
  1. 尝试调用该对象的 `valueOf` 方法转为原始值。
  2. 如果没有 `valueOf` 方法，或`valueOf`方法返回的不是原始值(Primitive)，则尝试调用 `toString` 方法转为原始值。
  3. 根据转换后的原始值类型，进入上述步骤 `1~6`
  4. 如果无法转换为原始值，则抛出类型异常 `TypeError: Cannot convert object to primitive value`

<!-- more -->

## Number 方法

通过 `Number(data)` 进行强制类型转换。

如果要转换的类型是一个 `Object`，会优先调用对象的 `valueOf` 方法转为**原始值**。
如果找不到 `valueOf` 方法，再到原型链上找，依然没有或者 `valueOf` 方法返回的 **不是原始值** 的话，再找 `toString`方法。

> Tip:
>
> 需要注意的是，如果 `valueOf` 方法返回的不是一个 **原始值**，
> 那么也会转而调用 `toString` 方法来尝试转换为一个 原始值。

```js
Number(undefined); // NaN
Number(null);      // 0
Number(true);      // 1
Number(false);     // 0
Number(123.4);     // 123.4
Number('123');     // 123
Number('123abc');  // NaN
Number('');        // 0
Number(Symbol());  // TypeError
Number([]);        // 0
Number([123]);     // 123
Number([1,2]);     // NaN
Number({});        // NaN
Number({ valueOf: function() { return '123' } }); // 123
// 注意下面 返回了 123
// 这是因为 Object 的原型链上虽然存在 valueOf 方法，但是该方法并不返回一个原始值，而是返回该对象本身
// 而这里需要一个原始值，所以才会调用 toString 方法
Number({ toString: function() { return '123' } }); // 123
Number({ toString: function() { return '123' }, valueOf: function() { return '456' } }); // 456
```

## parseInt/parseFloat 及 Math对象的方法

通过 `parseInt(str)/parseFloat(str)` 提取出字符串开头的整数或浮点数。

如果 `argument` 是一个对象，会优先调用 `toString` 方法转为原始值。
如果找不到 `toString` 方法，再到原型链上找，依然没有或者 `toString` 方法返回的 **不是原始值** 的话，再找 `valueOf`方法。

```js
// parseInt parseFloat
parseInt(undefined);    // NaN
parseFloat(null);       // NaN
parseInt(true);         // NaN
parseInt(false);        // NaN
parseInt(123.456);      // 123
parseInt('123.456');    // 123
parseFloat('123.456');  // 123.456
parseInt('123abc');     // 123
parseFloat('abc123');   // NaN
parseInt('123abc', 16); // 1194684
parseInt('abc123', 16); // 11256099
parseInt('0xa1');       // 161
parseInt(Symbol());     // TypeError
parseInt([]);           // NaN
parseInt([123]);        // 123
parseInt([1,2,3]);      // 1
parseInt({});           // NaN
parseInt({ toString: function() { return '123abc'; } }); // 123
parseInt({ valueOf: function() { return '456'; } });  // NaN
var obj = Object.create(null);
parseInt(obj);         // TypeError
obj.valueOf = function () { return '456'; };
parseInt(obj);         // 456
parseInt({ toString: function() { return '123abc'; }, valueOf: function() { return '456'; } }); // 123
parseInt({ toString: function() { return {}; }, valueOf: function() { return '456'; } }); // 456

// Math
Math.floor(null);     // 0
Math.ceil(undefined); // NaN
Math.abs(true);       // 1
Math.round(false);    // 0
Math.floor('12.3');   // 12
Math.ceil('-12.3');   // -12
Math.round('12.5');   // 13
Math.abs('12.3');     // 12.3
Math.abs('-12.3');    // 12.3
Math.abs('12ab');     // NaN
Math.abs([]);         // 0
Math.abs([12]);       // 12
Math.abs([1, 2]);     // NaN
Math.abs({});         // NaN
Math.abs({ valueOf: function() { return 123 } });    // 123
Math.abs({ toString: function() { return '456' } }); // 456
Math.abs({ valueOf: function() { return 123 }, toString: function() { return '456' } });         // 123
```

> Tip:
>
> 这里解释一下上面两次测试 `valueOf` 的结果不同的原因
> 第一次的参数是一个字面量的 `object`，
> 而第二次的参数是通过 `Object.create()` 方法生成的，指定原型为 `null` 的对象。
>
> 区别就在这里，虽然字面量的对象里只有一个 `valueOf` 方法，但是在对象的原型链上还是存在一个 `toString` 方法的。
>
> 所以根据 对象转字符串 的规则，会调用 `toString` 而不是 `valueOf`。
> 故第一次的测试对象转为字符串的结果其实是 `object.toString()` => `"[object Object]"`。
> 因此得到的是 `NaN`。
>
> 而第二次的对象，其原型为 null，是一个没有任何属性或方法的对象。
> 直接传入 `parseInt` 时，会由于找不到 `toString` 方法和 `valueOf` 方法而抛出一个 `TypeError`。
> 后面给它添加了一个 `valueOf` 方法后，
> 转换时找不到 `toString`，就会找到这个 `valueOf` 方法，
> 然后得到了 `"456"`，然后 `parseInt("456")` 就得到了结果 `456`。

### parseInt 扩展

`parseInt` 函数有两个参数，第一个必须参数 *string* 和第二个可选参数 *radix*。

第一个参数 *string* 头部的空白符会被忽略。
即 `parseInt('123')` 和 `parseInt(' \n\v\t123')` 其实是一样的。

第二个可选参数 *radix*，表示进制基数。
一般情况下默认为 `10`，即十进制。
但如果第一个参数是以 `0x` 或者 `0X` 开头的类似十六进制的字符串，那么*radix*则会被默认为 `16`。

*radix* 范围是 *2~36*，根据进制的不同，可转换字符的范围也是不同的。
比如上面的例子：`'abc123'`，原本默认的十进制中是没有 `abc` 这样的数的，所以无法解析转换。
而把 *radix* 设置为 *16* 进制后，因为在16进制里，a相当于10，b相当于11，c相当于12。
也就是存在这样的数字，因此能够解析出来该数字，返回是一个十进制的数字。

另外，设置 *radix* 为 *2~36* 之外的数字的话，会返回 `NaN`，(**0** 除外,)
如果第二个可选参数 *radix* 为 **0**：
- 第一个参数不是以 `0x` 或者 `0X` 开头的，则会以 `10` 来处理。
- 如果第一个参数是以 `0x` 或 `0X` 开头的，则以 `16` 来处理。


ecma262 原文如下：

> ### 18.2.5 parseInt (*string*, *radix*)
> The **parseInt** function produces an integer value dictated by interpretation of the contents of the *string* argument according to the specified *radix*. Leading white space in *string* is ignored. If *radix* is **undefined** or 0, it is assumed 10 except when the number begins with the code unit pairs **0x** or **0X**, in which case a radix of 16 is assumed. If *radix* is 16, the number may also optionally begin with the code unit pairs **0x** or **0X**.


## 算术表达式

相比较上面两种强制转换的方式，这种方式属于 `隐式转换`。

```js
undefined - 0; // NaN
null - 0; // 0
null * 1; // 0
'123' - 0; // 123
'123' * 1; // 123
'123abc' - 0; // NaN
[] - 0; // 0
[123] - 0;  // 123
[1,2,3] - 0; // 1
({}) - 0; // NaN
({ valueOf: function() { return '123'; } }) - 0; // 123
({ toString: function() { return '123'; } }) - 0; // 123
({ toString: function() { return '123'; }, valueOf: function() { return '456'; } }) - 0; // 456
```

> Tip:
> 不要用 加号(+)。
> 因为加号在遇到字符串与数字相加时，会将数字转换为字符串，而不是将字符串转换为数字。

```js
1 + 1; // 2
1 + true; // 2
1 + ({ toString: function () { return 1; } }); // 2
1 + ({ valueOf: function () { return 1; } });  // 2
1 + null; // 1
1 + '0'; // '10'
1 + []; // '1'
1 + [1]; // '11'
```

## 一元运算符

注意下面的 `+` 是一元运算符的 `正号`，而非 `加号`

```js
+'123';    // 123
-(-'123'); // 123
```

## 位运算

```js
~~'123';   // 123
'123' | 0; // 123
```

------------

## 参考资料

- [ECMAScript® ToNumber][ToNumber]
- [ECMAScript® ToNumber Applied to the String Type](https://tc39.github.io/ecma262/#sec-tonumber-applied-to-the-string-type)
- [ECMAScript® ToPrimitive](https://tc39.github.io/ecma262/#sec-toprimitive)
- [ECMAScript® OrdinaryToPrimitive](https://tc39.github.io/ecma262/#sec-ordinarytoprimitive)


下面贴出部分原文：

> ### 7.1.3 ToNumber
> The abstract operation ToNumber converts *argument* to a value of type Number according to Table 10:
>
> Table 10: ToNumber Conversions
>
> | Argument Type |      Result      |
> |---------------|-----------------|
> | Undefined     | Return **NaN**.  |
> | Null          | Return **+0**.   |
> | Boolean       | If *argument* is **true**, return 1. If *argument* is **false**, return **+0**. |
> | Number        | Return *argument* (no conversion). |
> | String        | See grammar and conversion algorithm below. |
> | Object        | Apply the following steps: 1. Let *primValue* be ? ToPrimitive (*argument*, hint Number). 2. Return ? [ToNumber][ToNumber](*primValue*) |

> ### ToPrimitive (*input*[,*PreferredType*])
>
> The abstract operation ToPrimitive takes an *input* argument and an optional argument *PreferredType*.
> The abstract operation ToPrimitive converts its *input* argument to a non-Object type.
> If an object is capable of converting to more than one primitive type, it may use the optional hint *PreferredType* to favour that type.
> Conversion occurs according to the following algorithm:
>
> 1. [Assert][Assert]: *input* is an [ECMAScript language value][ECMAScript].
> 2. If [Type][Type](*input*) is Object, then
>     1. If *PreferredType* is not present, let *hint* be **"default"**.
>     2. Else if *PreferredType* is hint String, let *hint* be **"string"**.
>     3. Else *PreferredType* is hint Number, let *hint* be **"number"**.
>     4. Let *exoticToPrim* be ? [GetMethod][GetMethod](*input*, @@toPrimitive).
>     5. If *exoticToPrim* is not **undefined**, then
>         1. Let *result* be ? [Call][Call](*exoticToPrim*, *input*, <<*hint*>>).
>         2. If [Type][Type](*result*) is not Object, return *result*.
>         3. Throw a **TypeError** exception.
>     6. If *hint* is **"default"**, set *hint* to **"number"**.
>     7. Return ? [OrdinaryToPrimitive][OrdinaryToPrimitive](*input*, *hint*).
> 3. Return *input*.
>
>> NOTE
>> When ToPrimitive is called with no hint, then it generally behaves as if the hint were Number.
>> However, objects may over-ride this behaviour by defining a @@toPrimitive method.
>> Of the objects defined in this specification only Date objects (see [20.3.4.45][DateToPrimitive]) and Symbol objects (see [19.4.3.4][SymbolToPrimitive]) over-ride the default ToPrimitive behaviour.
>> Date objects treat no hint as if the hint were String.


[ToNumber]: https://tc39.github.io/ecma262/#sec-tonumber
[TheStringType]: https://tc39.github.io/ecma262/#sec-ecmascript-language-types-string-type
[Assert]: https://tc39.github.io/ecma262/#assert
[ECMAScript]: https://tc39.github.io/ecma262/#sec-ecmascript-language-types
[Type]: https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
[GetMethod]: https://tc39.github.io/ecma262/#sec-getmethod
[Call]: https://tc39.github.io/ecma262/#sec-call
[OrdinaryToPrimitive]: https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
[DateToPrimitive]: https://tc39.github.io/ecma262/#sec-date.prototype-@@toprimitive
[SymbolToPrimitive]: https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
[parseInt]: https://tc39.github.io/ecma262/#sec-parseint-string-radix
