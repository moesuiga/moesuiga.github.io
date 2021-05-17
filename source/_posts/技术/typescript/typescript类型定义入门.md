---
title: TypeScript 类型定义入门
keywords: typescript, ts, type, interface, 类型定义, 入门指南
description: TypeScript 是 JavaScript 的一个超集，针对 JavaScript 过于灵活的一个弊端，增加了静态类型。本文将带领你初步了解 TypeScript 中一些常见的类型定义与用法。
category:
  - 技术文章
tags:
  - TypeScript
date: 2020-11-26 20:05:19
updated: 2021-5-11 09:01:42
photos:
  - /images/gallery/2020112601.png
---

## 目的

本文旨在帮助新接触 TypeScript 的开发人员，能够快速了解 TypeScript 中的类型定义语法。
想了解更多，可以查看 TypeScript 官方文档手册：https://www.tslang.cn/docs/handbook/basic-types.html

愿你有一段愉快的 TypeScript 开发体验。

## 类型

> 注：这里所说的基础类型与复杂类型，是基于 JavaScript 的原始类型与复杂类型来区分的，并非 TypeScript 文档中所说的基础类型

### 基础类型

TypeScript 是 JavaScript 的一个超集，那么在 TypeScript 中的类型基本与 JavaScript 相同。
在 TypeScript 中主要有这几种基础类型：`number`, `string`, `boolean`, `symbol`, `bigint`。
分别对应 JavaScript 中的 `Number`, `String`, `Boolean`, `Symbol` 和 `BigInt`。
**注意大小写哦**

### 复杂类型

除去基础类型之外，更复杂的是其他的对应于 JavaScript 的 `Object`, `Array` 与 `Function` 的类型。
比如: `object`, enum枚举, `Array<T>`, `ArrayLike<T>`, Tuple元组, `Function` 等等，类型有很多，先不用太过关注这里列举出来的东西。

> #### enum 枚举是什么？
> 类似其他一些强类型编程语言中的枚举，当你想要一种类型，它只有有限的一些固定值时，就可以使用枚举类型。
> 它就相当于一个常量对象，内部存储了指定的有限个常量值。
> 这个类型的变量的值，只能是这些有限常量中的一个，不可能是其他任何值。
> 比如在不考虑一些特别的情况时，在我们的常识下，人类的性别只有两种：男性 和 女性。
> 此时就可以将性别作为一个枚举值来声明。
```ts
interface IPerson {
  name: string;
  age: number;
  gender: Gender;
}

enum Gender {
  female = 0,
  male = 1
}

let w: IPerson = {
  name: 'w',
  age: 18,
  gender: Gender.male
}
```
> 你可能发现了，除了将声明的枚举类型作为类型定义来使用以外，这里还把它作为一个值来使用了。
> 在 TypeScript 中，enum 关键字，除了会产生一个枚举类型定义以外，还会被编译成一个 JavaScript 对象，它是可以在代码中作为一个值来使用的。

> #### Tuple元组是什么？
> TypeScript中除了普通的数组类型外，还存在一种特殊的数组类型，元组。
> 用简单形象一点的说明，元组就是固定长度的数组。在这个定长数组中，可以给它的每一项来声明一个类型。
> 比如有一个长度为2的数组，它的第一项是数字，第二项是字符串。那么就可以把它声明为一个元组。
> `let tuple: [number, string] = [1, 'text'];`

### 空值类型与 any 类型

在 TypeScript 中有那么几个比较特殊的类型：`void`, `null` 和 `never`。

它们都是空值类型，但是也有一些区别。

- `void`: 表示未定义，可以对应 JavaScript 中的 `undefined`
- `null`: 从字面就可以理解，它就是对应着 JavaScript 中的空值 `null`
- `never`: 它是用来声明一个变量绝对不会有值，或者一个函数绝对不会返回的。
  当给一个变量声明 `never` 类型时，那么无论是什么值，即使是 `undefined` 和 `null` 也不能赋值给这个变量。
  同样的，如果给一个函数的返回类型声明为 `never`，就说明这个函数没有可访问的终结点，同时也就不能使用这个函数的返回值。
  如何理解函数没有可访问的终结点，也即没有返回值：要么这个函数固定会抛出异常；要么内部有一个死循环，一直不可能返回。

除了上面几个空值类型外，TypeScript 还有一个特殊的类型: `any`。
这个类型其实就是不明确类型，说明该类型的值可能是任何类型，无法判断。这也是针对 JavaScript 的灵活性做出的应对。
在 JavaScript 中，即使一开始声明一个变量并赋值为数字，但是在其他地方，也可能会把这个变量改成字符串，布尔值，甚至是一个函数。
在这种情况下，自然就无法确定这个变量的类型到底是什么了，也就是 `any` 类型。

## 如何使用这些类型定义？

### 显式声明

在变量名称后面跟上冒号 `:` 加类型来声明变量的类型。

```ts
let n: number = 1;
let str: string = 'Hello TS';
let bool: boolean = true;
let sym: symbol = Symbol('unique');
let bigNum: bigint = 996n;

let nums: number[] = [1, 2, 3, 4];
let fn: () => number = function fn() { return 1; }

interface IMonster {
  race: string;
  age: number;
  gender: 'male' | 'female' | 'unknown';
}
const yukari: IMonster = {
  race: 'Interstice',
  age: 17,
  gender: 'female'
}
```

### 类型推断

看了上面的示例，你可能会发出 “好麻烦啊~” 的感叹，但是实际项目中并不需要每个地方都这么显式的给每个变量注明类型。

TypeScript 是聪明的，它可以根据上下文来自行推断一个变量的类型。

举例来说，当我们给一个变量初始声明并赋值一个数字时，那么 TypeScript 就可以直接推断认为它是一个 `number` 类型的数据，而不需要你再通过如上示例那样给变量标注 `:number` 来告诉 TypeScript 它是一个数字。

所以在实际使用时，你尽可以这么来写：

```ts
let n = 1;
let str = 'Hello TS';
let bool = true;
let sym = Symbol('unique');
let bigNum = 996n;
```

TypeScript 能够准确的推断出来它们各自的类型。
当然，如果一开始没有赋值，那么 TypeScript 自然也就无从推断，此时还是需要显式的注明类型的。
另一种情况是，在声明处赋予的值的类型并不明确，那么 TypeScript 也无法推断出具体的数据类型。

### 类型断言

在某些情况下，虽然 TypeScript 无法确定一个值的类型，但是我们能够确定它的类型时，
就可以通过类型断言的方式来告诉 TypeScript 编译器：“我很清楚自己在干什么，相信我，它在这里就是这个类型”。

**类型断言的方式:**

- 一种是在要断言的变量或表达式的后面加上 `as` 关键字并跟上要断言的类型 ( `value as Type` )。
- 另一种则是在要断言的变量或表达式的前面加上尖括号包裹的断言类型 ( `<Type>value` )。
- 第三种是非空断言，留到下面空值保护中再讲。

我们推荐使用 `as` 关键字，写法上更易理解。

```ts
async function getNum(): number {
  // 使用 as 关键字断言
  const n = await request({...}) as number;
  return n;
}

let str: any = 'Hello TS';
// 使用尖括号 <string> 断言
let [, name] = (<string>str).split(' ');
```

## 接口

在自定义一些复杂的类型时，接口是经常被使用到的内容，是 TypeScript 类型定义中极为重要的组成部分。

在 TypeScript 中要定义一个对象类型，如果你使用类型 `object`，那么你只能得到一个非原始类型的数据类型定义。

要想更详细的定义一个对象内有哪些属性，哪些方法，这些属性和方法有分别有着怎样的类型，这时候你就需要了解 `interface` 了。

你可能注意到，在上面的一些示例中，已经出现过它了。

比如：

```ts
interface IPerson {
  name: string;
  age: number;
  gender: Gender;
}
```

这段接口声明中，`interface` 是接口声明的关键字，`IPerson` 则是声明的接口的名字，后面的代码块中则是声明了这个接口内有哪些属性以及它们的类型。
`IPerson` 接口有三个属性，`string` 类型的 `name` 属性、`number` 类型的 `age` 属性，`Gender` 枚举类型的 `gender` 属性。
当我们以接口 `IPerson` 为类型声明一个对象时，它就必须包含上述三个属性，且值要符合其各自的类型。

### 可选属性

并非所有的属性，在接口中都是必需的。有些属性可能一开始并不存在，或者只在某些特定条件下才会有。
这时候，就可以把它作为可选属性来声明。
只需要在正常的接口声明中，找到要设置为可选的属性，在属性名与冒号之间添加一个问号即可。

```ts
interface ISquareConfig {
  color?: string;
  width?: number;
}
```

### 只读属性

有些属性可能只在初始化时设置一个值，在后面就不可修改了，这时就可以通过 `readonly` 关键字来设置其为只读属性。
只读属性只可访问，不可修改。

```ts
interface IPoint {
  readonly x: number;
  readonly y: number;
}

const p: IPoint = {
  x: 1,
  y: 1
};
// 错误，只读属性不可修改
p.x = 10;

// TypeScript 中有一个 ReadonlyArray<T> 的类型，类似 Array<T>
// 只是将数组中的可变方法去掉了，以此来确保数组被创建后，不可更改
const arr: ReadonlyArray<number> = [1, 2];
arr.splice(1, 1); // 错误
arr.push(3); // 错误
arr[0] = 10; // 错误
arr.length = 5; // 错误
```

### 函数类型

接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。
为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
```

### 可索引的类型

与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如a[10]或ageMap["daniel"]。
可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。

让我们看一个例子：

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

TypeScript支持两种索引签名：字符串和数字。
可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。

```ts
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}

interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}
```

最后，你可以将索引签名设置为只读，这样就防止了给索引赋值：

```ts
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// 你不能设置myArray[2]，因为索引签名是只读的。
myArray[2] = "Mallory";
```

### 接口的继承与实现

在 TypeScript 中，我们可以通过 `extends` 继承一个接口来创建它的子类型；
也可以强制一个类按照某个接口定义的描述来实现它，使用 `implements` 来实现一个接口。

```ts
interface IClock {
  currentTime: Date;
  setTime(d: Date);
}

interface IAlarmClock extends IClock {
  knock();
}

class Clock implements IClock {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
当一个类实现了一个接口时，只对其实例部分进行类型检查，而不会检查静态部分。

## 高级技巧

### 联合类型与交叉类型

就像上面介绍 `any` 类型时所说，有时一个变量可能不止一种类型，比如一个网络请求的返回数据，当服务能查到数据时，会返回一个数值类型的状态码，可是如果服务查询出错了，那就只能返回 null 了。
这种情况下，要怎么声明它既可能是一个数字，又可能是一个空值呢？

TypeScript 有提供一种联合类型: `A | B` 。
联合类型表示一个值可以是几种类型之一，用竖线( `|` )分隔每个类型。所以 `number | null` 表示一个值可以是 `number` 或 `null` 。

因此要声明刚刚所说的状态码的类型，就可以这样来写：

```ts
// 可能是数值类型，也可能为 null
let status: number | null;
```

如果一个值是联合类型，它只能访问此联合类型的所有类型里共有的成员。
就像这个状态码，因为 `null` 没有任何属性或方法，所以直接调用 `number` 的方法是会报错的，必须先区分出两个类型。
这一点可以到下面的 类型保护与区分类型 一节了解。

另一种情况恰好相反，某个变量是多种类型的集合，它可能同时包含有类型A和类型B。
这时你需要的是交叉类型: `A & B`。

交叉类型写法类似联合类型，只是分隔符号是 `&`。
但与联合类型相反，交叉类型是同时包含多个类型，因此它可以访问包含的任何类型的任何成员。

```ts
// 既有通用区域信息，又包含热门区域信息
let area: ICommonArea & IHotArea;
```

### 字面量类型与类型别名

在 TypeScript 中除了使用特定的类型关键字以外，还可以使用字面量作为类型，以此表示常量类型。就像上面介绍枚举类型时所做的那样。
而这种字面量类型在实际使用场景中，通常都是多个字面量的联合类型。

比如：

```ts
// 使用字面量联合类型，达到枚举类型的效果
let gender: 'male' | 'female' = 'male';

let privilege: 0 | 1 | 2 | 4 | 8 | 16 = 0;
```

如果联合类型的数量比较多，又可能在多个地方使用的话，每次都写一长串的联合类型，是不是很烦恼？即使可以复制粘贴，也希望有一个更好的方式？
TypeScript 有提供一个声明类型别名的关键字 `type`，可以使用它来声明一个类型别名，使用这个别名来代替它的实际类型。

当然，类型别名并不只是用来给联合类型使用的，你也可以给一些特定的类型组合一个语义化别名，或者给一个自定义的函数类型加上语义化别名。
此外也可以使用类型别名(`type`)来实现一个类似于接口 (`interface`)的类型。

比如：

```ts
type IPrivilege = 0 | 1 | 2 | 4 | 8 | 16;
let privilege: IPrivilege = 4;

type IGetName = () => string;

type IPerson = {
  name: string;
  age: number;
  gender: Gender;
}
```

#### 类型别名注意点

1. 起别名不会新建一个类型 - 它创建了一个新 *名字* 来引用那个类型。 给原始类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

2. 类型别名不能被 `extends` 和 `implements` （自己也不能 `extends` 和 `implements` 其它类型）。
  因为 软件中的对象应该对于扩展是开放的，但是对于修改是封闭的，你应该尽量去使用接口代替类型别名。
  你可能会发现，即使去 `extends` 一个 `type`，一些开发工具也并不会对此报错，但是依然不建议这么使用。
3. 另一方面，如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

### 类型保护与区分类型

联合类型适合于那些值可以为不同类型的情况。 但当我们想确切地了解它是否是某个特定类型时怎么办？

JavaScript 里常用来区分2个可能值的方法是检查成员是否存在。 如之前提及的，我们只能访问联合类型中共同拥有的成员。

```ts
interface IDog {
  eat(food: string);
  run();
}

interface IBird {
  eat(food: string);
  fly();
}

function getAnimal(): IDog | IBird {
  // ...
}

let ani = getAnimal();

// 类型“IBird”上不存在属性“run”
if (ani.run) {
  ani.run();
}
// 类型“IDog”上不存在属性“fly”
else if (ani.fly) {
  ani.fly();
}

// 为了保证上面的代码不报错，我们只好使用类型断言
if ((<IDog>ani).run) {
  (<IDog>ani).run();
}
else if ((<IBird>ani).fly) {
  (<IBird>ani).fly();
}
```

这里可以注意到我们不得不多次使用类型断言。
假如我们一旦检查过类型，就能在之后的每个分支里清楚地知道 `ani` 的类型的话就好了。
TypeScript里的 **类型保护** 机制让它成为了现实。
类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型。
要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：

```ts
function isDog(animal: IDog | IBird): animal is IDog {
  return (<IDog>animal).run !== undefined;
}
```

在这个例子里， `animal is IDog` 就是类型谓词。
谓词为 `paramName is Type` 这种形式， `paramName` 必须是来自于当前函数签名里的一个参数名。
现在每当使用一些变量调用 `isDog` 时，TypeScript 会将变量缩减为那个具体的类型，只要这个类型与变量的原始类型是兼容的。

```ts
if (isDog(ani)) {
  // TypeScript 已经知道 ani 就是 IDog 类型了
  ani.run();
} else {
  // 这里也能推断出 ani 不是 IDog 类型，
  // 由于 ani 的类型是 IDog | IBird，所以现在它就是 IBird 类型
  ani.fly();
}
```

#### `typeof` 类型保护

如果要定义一个函数来判断类型是否是原始类型，想象一下，我们要怎么去写？

```ts
function isNumber(x: any): x is number {
  return typeof x === 'number';
}

function isString(x: any): x is string {
  return typeof x === 'string';
}

function setWidth(style: Record<string, string>, width: string | number) {
  if (isNumber(width)) {
    style.width = `${width}px`;
  }
  if (isString(width)) {
    style.width = width;
  }
  throw new TypeError(`Expected string or number, got '${width}'.`);
}
```

如果还要再一个个定义其他的原始类型：`boolean`, `symbol`, `bigint`， 天啊这太痛苦了不是吗？
幸运的是，现在我们不必将 `typeof x === "number"` 抽象成一个函数，因为 TypeScript 可以将它识别为一个类型保护。

也就是说我们可以直接在代码里检查类型了。

```ts
function setWidth(style: Record<string, string>, width: string | number) {
  if (typeof width === 'number') {
    style.width = `${width}px`;
  }
  if (typeof width === 'string') {
    style.width = width;
  }
  throw new TypeError(`Expected string or number, got '${width}'.`);
}
```

这些 **typeof类型保护** 只有两种形式能被识别： `typeof v === "typename"` 和 `typeof v !== "typename"`。

`"typename"` 必须是  `"number"`, `"string"`, `"boolean"`, `"symbol"`, `"bigint"` 或者 `"undefined"`。

但是 TypeScript 并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。即 `"object"` 与 `"function"` 并不会被识别。

#### `instanceof` 类型保护

如果你已经阅读了 **typeof类型保护** 并且对 JavaScript 里的 `instanceof` 操作符熟悉的话，你可能已经猜到了这节要讲的内容。

`instanceof` 类型保护是通过构造函数来细化类型的一种方式。

```ts
interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) :
    new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为'StringPadder'
}
```

`instanceof` 的右侧要求是一个构造函数，TypeScript 将按以下顺序细化为：

1. 此构造函数的 `prototype` 属性的类型，如果它的类型不为 `any` 的话
2. 构造签名所返回的类型的联合

#### 可为空的类型与空值的类型保护

上面我们讲过，在 TypeScript 中有三种空值类型: `null`, `void`(或者`undefined`) 和 `never`。
抛开 `never` 这个永不返回值或永远不存在的类型，`null` 和 `void` 也是我们在实际项目中经常要判断去除的数据。

在 TypeScript 中，一个可为空的类型都是通过联合类型实现的，如 `number | null`, `string | void`,  `number | null | undefined`。

而要使用类型保护来去除空值的话，其与在 JavaScript 里写的代码是一致的：

```ts
function func(sn: string | null): string {
  if (sn == null) {
    return "default";
  }
  return sn;
}

// 也可以使用短路运算
function func(sn: string | null): string {
  return sn || "default";
}
```

如果某些情况编译器不能够去除 `null` 或 `undefined`，你可以使用类型断言手动去除。

语法是添加 `!` 后缀： `identifier!` 从 `identifier` 的类型里去除了 `null` 和 `undefined`。

```ts
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok
  }
  name = name || "Bob";
  return postfix("great");
}
```

本例使用了嵌套函数，因为编译器无法去除嵌套函数的 `null`（除非是立即调用的函数表达式）。
因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。
如果无法知道函数在哪里被调用，就无法知道调用时 `name` 的类型。

### 映射类型

映射类型就是从旧类型中创建新类型的一种方式。
比如在接口部分中我们有提到可选属性与只读属性，但是那种是对接口中的某个或某几个属性做出的说明。
如果现在需要一个接口，要求它的所有属性都是可选属性，或者所有属性都是只读属性的话，总不能再写一个新的接口，并且把每个属性都加上可选或只读吧？

TypeScript 提供了一些这方面的预置类型：`Partial<T>`, `Readonly<T>`, `Pick<T, K extends keyof T>`, `Record<K extends string, T>`。

它们的实现如下：

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
}

type Readonly<T> = {
  readonly [P in keyof T]: T[p];
}

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}

type Record<K extends string, T> = {
  [P in K]: T;
}
```

在这里，你会看到一些新的内容：`keyof` 和 索引式的 `for ... in`。
你可以把 `keyof` 类比到 JavaScript 中的 `Object.keys` ，它是获取接口定义的属性名列表的。
然后再通过 `in` 操作符挨个将属性名赋给 `P`，而后把这个 `P` 作为新接口的属性。
这四个类型中， `Partial<T>`, `Readonly<T>` 和 `Pick<T, K extends keyof T>` 都是同态的。

### 泛型

你是否发现了上面几个映射类型在写法上有什么特别的？
它们在类型名称后面都有一个尖括号，内部有一个或多个名称。比如 `Partial<T>` 中的 `<T>`。
乍一看似乎和前面讲到的类型断言有点相似，只是一个在前，一个在后。

但它并不是类型断言，而是被叫作 **泛型** 。

不要从名字上理解，认为泛型与 `any` 类似。
泛型不同于 `any`，你可以认为它是一个未定义的类型别名，是一个函数的形参。
在实际使用时，必须给这个泛型一个明确的类型，可以是单例类型，也可以是交叉、联合类型。

而后 TypeScript 会根据实际使用时的类型，动态的得出最终结果的类型。

```ts
type Exclude<T, U> = T extends U ? never : T
```

#### 为什么要用泛型？

从上面的说明中，你应该能了解到，泛型的结果与输入有关，这就相当于一个函数，输入不同，输出也会改变。
有时候我们就是需要根据不同的输入，得到不同的输出类型。这就是泛型的价值。
假设我们有下面这样一个函数，它什么也不做，只是把传入的第一个参数返回。

```ts
function returnArg(arg) {
  return arg;
}
```

这时候，我们要怎么定义它的参数arg的类型，以及函数的返回类型？
参数 `arg` 可以是任何类型，同样的，返回的 `arg` 自然也可以是任何类型。
可是如果我把它们定义为 `any` 类型，那样并不能表现出来返回类型与参数类型之间的关系，不论传入什么参数，函数的返回都是 `any` 类型。

可事实上，我们知道，如果传入 `string` ，它只会返回 `string`；如果传入 `number` ，它也只会返回 `number`。

为此，我可以使用泛型来定义，先给函数声明一个泛型 `A`【`A`仅仅只是一个随便的命名，类似于函数的形参，并非必须要命名为 `A`】，然后定义参数 `arg` 类型为 `A`。那么函数的返回类型自然也是 `A`。

此时我们就能发现，函数的参数类型与返回类型有了一个关联，当我传入一个 `string` 时，TypeScript 就能知道函数的返回类型也是 `string`；传入 `number` 时，也能知道返回 `number`。

```ts
function returnArg<A>(arg: A): A {
  return arg;
}
```

#### 泛型约束

泛型很灵活，只有在使用时才能知道具体的类型是什么，这似乎有点回到 JavaScript 中的样子。
如果有些地方，我需要使用到泛型，然而我还希望这个泛型是某个类型的子类型时怎么办？
可以通过 `extends` 继承来约束泛型。

```ts
interface Lengthwise {
  length: number;
}

// 使用 extends 约束泛型必须有一个 length 属性且类型为 number
function returnArg<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 泛型约束的默认值
function getProperty<T extends IPerson = IPerson>(obj: T, key: keyof T) {
  return obj[key];
}
```

上面的示例中出现了泛型的默认值，值得注意的是，默认值与继承约束不一样，即使没有任何约束的泛型，也可以有默认值。而有默认值的泛型也并不会以默认值作为泛型的约束。

```ts
// 像这样，只是给泛型 T 一个默认类型 IPerson
// 但并没有对泛型进行任何约束，即可以在实际使用时重置泛型 T 为任何其他的类型
function getProperty<T = IPerson>(obj: T, key: keyof T) {
  return obj[key];
}
```

### 可辨识联合类型

你可以合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式，它也称做 标签联合或 代数数据类型。
可辨识联合在函数式编程很有用处。 一些语言会自动地为你辨识联合；而TypeScript则基于已有的JavaScript模式。
它具有3个要素：

1. 具有普通的单例类型属性 — *可辨识的特征*。
2. 一个类型别名包含了那些类型的联合 — *联合*。
3. 此属性上的 *类型保护*。

```ts
// 首先我们声明将要联合的接口。
// 每个接口都有 kind 属性但有不同的字符串字面量类型。
// kind属性称做 可辨识的特征 或 标签。
// 其它的属性则特定于各个接口。

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
// 注意，目前各个接口间是没有联系的。

// 下面我们把它们联合到一起：
type Shape = Square | Rectangle | Circle;

// 现在我们使用可辨识联合
function area(s: Shape) {
  switch (s.kind) {
    case "square": return s.size * s.size;
    case "rectangle": return s.height * s.width;
    case "circle": return Math.PI * s.radius ** 2;
  }
}
```

从上面的示例中，我们来总结一下：

所谓 **可辨识联合** 就是多个具有相同单例属性名称但有不同字面量的类型，联合成一个类型【*联合*】，然后根据这个单例属性【即 *可辨识特征* 】的不同字面量来推断出它的具体类型【*类型保护*】。

## 结语

以上就是本文档的全部内容了，但是也只是简单介绍了一些我们项目中常用的以及实际工作中比较实用的内容；TypeScript 官方文档还有更多东西没有介绍，比如命名空间、模块、声明合并、混入等。
如果你对此感兴趣，想进一步了解的话，建议移步 [TypeScript官方文档](https://www.tslang.cn/docs/home.html) 查看更多。
那么假如本篇文档有帮助到你的话，我很高兴能写下它。


## 参考

【我得承认一点，写到后面，我直接复制了官方文档的内容】

- [TypeScript官方文档](https://www.tslang.cn/docs/home.html)
