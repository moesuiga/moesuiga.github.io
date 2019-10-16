---
en_title: Console_In_Web
title: console in web
keywords: console, 控制台, js, javascript, web, browser
description: 控制台console的一些方法记录
category:
  - JavaScript
tags:
  - console
date: 2018/1/7 18:11:53
updated: 2019/10/16 15:46:38
photos:
  - https://miao.su/images/2019/02/23/16d2d6.jpg
---

一般我们要在控制台输出一些信息的时候，大多数情况都只是使用 `console.log` 来输出。但是，你知道吗？其实 `console` 还有很多其他的方法。

## log

在控制台打印内容，一般的用法——也是我们常用的用法——就是`console.log(info[,info,...])`。

```js
var name = 'c.c.';
console.log('I like ', name);
// => I like c.c.
```
<!-- more -->

## debug/info

`info` 是 `log` 的别名，在某些地方见有人说过 `console.info` 会在输出的文本前加上一个小三角标示，但我在浏览器控制台实测并没有小三角标示。

`debug` 也类似 `log`，不同的是在分级上 `debug` 属于调试信息，一般在控制台会被过滤掉，需要在控制台选中 `Verbose` 来查看。

```js
var text = 'Without a date';
console.debug('debug: %s', text);
console.info('info: %s', text);
```

## warn/error

`warn` 在控制台输出一条带有 “警告” 图标的消息和一个指向该代码调用的追溯引用信息，文字与背景颜色为黄色。
`error` 在控制台输出一条带有“错误”图标的消息和一个指向该代码调用的追溯引用信息，文字与背景颜色为红色。

`warn`, `error` 除了上面的说明外，还有一个输出级别的区分，我们可以通过不同的条件来过滤，只查看 `warn` 级别或者 `error` 级别的输出信息。这在一些具有较多输出日志的情况下，能更快速的找到自己需要的一些信息。

## trace

在控制台输出该代码调用的追溯引用信息。

实际项目中，一个函数可能在多个地方有调用，还有多个函数嵌套。
有时候想要知道这个函数在某时刻具体是在哪个函数调用的，就可以通过追溯找到嵌套的调用函数路径。

```js
function fn1() {
  function fn2() {
    console.trace('追溯调用位置');
  }
  fn2();
}
fn1();
```

## time/timeLog/timeEnd

想知道某段代码的运行时间？你还在用下面这种方式吗？

```js
var start = new Date().getTime();
// ... codes
console.log('cost: ', new Date().getTime() - start);
```

快来试试 `console.time/console.timeEnd` 组合吧。

`console.time(label)` 创建一个索引为 `label` 的计时器，
`console.timeLog(label)` 输出索引为 `label` 的计时器经历的时间，
`console.timeEnd(label)` 停止索引为 `label` 的计时器，并输出从创建到停止所耗的时间（毫秒）。常用来查看代码运行的效率性能。

> 使用 `timeLog/timeEnd` 时，必须有一个通过 `time` 创建了的定时器。
> 如果没有创建或 label 参数错误无法找到创建的定时器，会输出一个警告 `Timer 'default(or input label)' does not exist`

```js
console.time('Sum');
var sum = 0;
var end = 1000;
for (var i = 1; i < end; i++) {
  sum += i;
  if (i === end / 2) console.timeLog('Sum'); // => Sum: 0.06396484375ms
}
console.log('1~1000之和: ', sum); // => 1~1000之和:  499500
console.timeEnd('Sum'); // => Sum: 0.26708984375ms
```

## group/groupEnd/groupCollapsed

`group`方法输出一条消息，并打开一个分组的嵌套块，块中的内容都会缩进，调用`console.groupEnd()`关闭嵌套块。
`groupCollapsed` 方法与 `group` 方法一样，唯一的区别是该组的内容，在第一次显示时是收起而非展开的。

通过这个方法，我们可以很清楚的了解到代码的运行顺序。

```js
console.group('group demo');

  console.log('program start ...');
  console.groupCollapsed('loop');
  for (var i = 0; i < 10; i++) {
    console.log(i);
  }
  console.groupEnd();
  console.log('program end ...');

console.groupEnd();
```

## profile/profileEnd

`console.profile([title])` 打开JavaScript性能测试开关，可选参数title会在打印性能测试报告时在报告的开头输出。这两个 API 尚未标准化

```js
function doTask() {
  doTaskA(1000);
  doTaskA(100000);
  doTaskB(10000);
  doTaskC(1000);
}
function doTaskA(count) {
  for(var i = 1; i < count; i++){}
}
function doTaskB(count) {
  for(var i = 1; i < count; i++){}
}
function doTaskC(count) {
  for(var i = 1; i < count; i++){}
}
console.profile('testTitle');
doTask();
console.profileEnd('testTitle');
```

## table

对于某些复合类型的数据，`console.table(object)`方法可以将其转为表格显示。条件是必须拥有主键。
对于数组来说，主键就是数字键；对于对象来说，主键就是它的最外层键。

表格可以用于数据统计，如果要查看一个结构相同或类似的列表时，就可以使用 `console.table` 。另外 `console.table` 还可以根据第二个参数，来过滤要展示的属性列表，在 Chrome 浏览器中还能够点击第一行的索引来重新排序。

```js
var arr = [{
  name: 'RWBY',
  year: 2013,
  series: 6,
}, {
  name: 'OVERLORD',
  year: 2015,
  series: 3,
}, {
  name: '狐妖小红娘',
  year: 2015,
  series: 5,
}, {
  name: 'JOJO',
  year: 2012,
  series: 6,
}];
console.table(arr);
console.table(arr, ['name', 'year'])
/*
    -----------------------------------------
    | (index) | name       | year | series  |
    |---------------------------------------|
    | 0      | "RWBY"      | 2013 | 6       |
    | 1      | "OVERLORD"  | 2015 | 3       |
    | 2      | "狐妖小红娘" | 2015 | 5       |
    | 3      | "JOJO"      | 2012 | 6       |
    ----------------------------------------
 */
```

## count/countReset

`count` 计数器，输出它被调用了多少次，有一个可选参数，会在显示计数时在开头输出，并用于区分不同的计数器。

`countReset` 重置 `count` 计数器。

```js
for (var i = 0; i < 10; i++) {
  if (i % 2) {
    console.count('odd');
  } else {
    console.count('even');
  }
}
console.countReset('odd'); // in FireFox => odd: 0  in Chrome: no output
console.countReset('even'); // in FireFox => even: 0  in Chrome: no output
```

## dir/dirxml

`dir` 方法用于显示指定对象的属性，并以易于阅读的格式——类似文件树样式的交互列表——显示，该方法对于输出DOM对象非常有用。(在 FireFox 中会直接展开)
`dirxml` 方法主要用于显示一个明确的 XML/HTML 元素的 DOM 节点对象，可以让你看到该节点的所有子节点内容。如果参数不是 DOM 节点，而是普通的JavaScript对象，`console.dirxml` 等同于 `console.dir`。

```js
console.dir(document.getElementById('header'));
console.dirxml(document.getElementById('header'));
```

## assert

`assert`方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序的执行。这样就相当于提示用户，内部状态不正确。

它接收两个参数，第一个是表达式，第二个是字符串。只有当第一个参数为`false`时，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

```js
console.assert(1 > 2, '判断错误');
//=> Assertion failed: 判断错误

// 相当于
try {
  if (1 > 2) {
    throw new Error('判断错误');
  }
} catch(e) {
  console.error(e);
}
```

> `console.assert()`方法在 Node.js 中的实现和浏览器中可用的 `console.assert()` 方法实现是不同的。
> 在**浏览器**中当 `console.assert()` 方法接受到一个值为假断言（assertion）的时候，会向控制台输出传入的内容，但是**并不会中断代码的执行**，而在 **Node.js v10.0.0** 之前，一个值为假的断言也将**会导致一个AssertionError被抛出，使得代码执行被打断**。
> v10.0.0修复了此差异，所以现在console.assert()在node和浏览器中执行行为相同。
> 引自: [MDN-Console.assert](https://developer.mozilla.org/zh-CN/docs/Web/API/Console/assert)

## memory

一个可以查看 JS 堆栈内存使用情况的对象，Chrome 浏览器。

```js
console.momery;
// MemoryInfo{totalJSHeapSize: 35100000, usedJSHeapSize: 29400000, jsHeapSizeLimit: 1136000000}
```

## clear

clear方法用于清除当前控制台的所有输出，将光标回置到第一行。

## console 的其他小知识

### 打印对象

以前遇到过好些人问，用 `console.log` 去调试的时候，打印一个对象，查看发现某个属性明明是有值的，可是代码运行却是按照无值来运行的。这是怎么回事？

```js
var yakumo = {
  name: 'Yukari',
  age: Infinity,
};

console.log(yakumo); // You think: { name: 'Yukari', age: Infinity }, in fact: ??

if (yakumo.age > 18) {
  console.log('before changed'); // this will be output
} else {
  console.log('after changed');
}
// 👁👁 Spell Card: 年长与年轻的境界 😏
yakumo.age = 17;
```

把上面的代码复制，放到浏览器的控制台中运行一遍，你可能会说：我这边输出的是 `{ name: 'Yukari', age: Infinity }` 啊。
但是接下来，点击一下对象左侧的三角，展开对象，你会发现该对象 `age` 的值成了 `17`。

其实 `console.log` 打印出来的对象并非该对象的当时值(深拷贝)，打印出来的其实是对象的一个地址引用。
在展开对象之前以文本形式展示出来的，是对象被打印时刻的状态转成字符串的输出。
当你**第一次**展开对象时，会获取到最新的对象属性进行查看，之后关闭再展开时，则固定成了第一次的属性了（排除使用 getter 或类似的属性）。
我们都知道代码运行时很快的，所以当你在控制台上看到这个被打印出来的对象时，这个对象内的一些属性也许早已在某些地方被改变了。

### 格式化占位符

`console.log` 第一个参数中还支持 `printf` 的占位符哦，后续参数根据位置对应填入占位符的位置输出。

支持的格式化占位符列表：

| 占位符 |             意义             |
|--------|-----------------------------|
|   %s   |             字符串           |
| %d, %i |  整型（暂不支持数字型字符串）  |
|   %f   | 浮点型（暂不支持数字型字符串） |
| %o, %O |           链接对象           |
|   %c   |         CSS格式字符串        |

`%s` 是字符串的占位符。

```js
console.log('%s placeholder', 'hello'); // => hello placeholder
console.log('%s', {}); // Chrome => Object
// FireFox => [object Object]
console.log('%s', []); // Chrome => Array(0)
// FireFox => <null character>
```

`%d`、`%i`、`%f`, 虽然在 JS 中不区分整型与浮点型，只有 `Number`。但是在占位符中，`%d` 与 `%i` 只会输出整数部分，而 `%f` 则能输出浮点数。如果对应占位符的参数不是 `Number` 类型，则会输出 `NaN`。

> 在 Chrome 中的表现：`%d`,`%i`,`%f` 只能作为 `Number` 的占位符，即使是数字型的字符串(e.g. "123") 也会输出成 NaN
> 在 FireFox 中可以输出 numeric 的字符串，如果是不能转成数字的字符串，则会输出 0，另 `%f` 固定会输出一个 6 位小数位的浮点数

```js
console.log('1 + 2 = %d', 1 + 2); // => 1 + 2 = 3
console.log('1 + 2 = %f', 1 + 2); // Chrome => 1 + 2 = 3
// FireFox => 1 + 2 = 3.000000
console.log('0.1 + 0.2 = %f', 0.1 + 0.2); // Chrome => 0.1 + 0.2 = 0.30000000000000004
// FireFox => 0.1 + 0.2 =  0.300000
console.log('1.2 + 1.3 > %i', 1.2 + 1.3); // => 1.2 + 1.3 > 2
console.log('numeric will be %d', '123'); // Chrome => numeric will be NaN
// FireFox => numeric will be 123
```

`%o`, `%O` 都是对象的占位符。

在 FireFox 浏览器中表现相同，在 Chrome 浏览器中的表现则不同。

Chrome 中的不同之处在于：`%o` 是对象引用，会直接将对象内的属性展示出来，对于 DOM 节点对象则是展示类似 Element 的节点；而 `%O` 则是折叠起来的对象，在不点击展开的情况下，无法看到对象内的属性，对于 DOM 节点对象也是如此。

```js
// in Chrome
console.log('%o', {name: 'obj'}); // => {name: 'obj'}
console.log('%O', {name: 'obj'}); // => Object
console.log('%o', document.getElementById('header')); // => <header id="header">...</header>
console.log('%O', document.getElementById('header')); // => header#header{}

// 下面的情况不清楚是怎么回事，有兴趣的可以深入研究一下
// 后面的圆括号备注的类型，是根据 Chrome 的输出颜色得出的判断，也不一定准确
// 欢迎有了解的人解惑
console.log('%d', 123); // => 123 (string)
console.log('%o', 123); // => 123 (number)
console.log('%O', 123); // => 123 (string)
console.log('%s', 'string'); // => string
console.log('%o', 'string'); // => "string" (注意这里的双引号是输出的)
console.log('%O', 'string'); // => string
```

`%c` 是 CSS 格式字符串的占位符。可以通过 `%c` 占位符给输出的文本添加一些样式，比如更大的字号、更醒目的颜色、添加背景色等，使得输出更加醒目。

因为每个浏览器的具体实现不同，更多的 CSS 效果可以自己动手试试看。

> 每个输出默认是 `inline` 盒子，且无法使用 `display` 转换成 `block`。
> 也因此，`width`, `height` 属性无效，但可以通过 `line-height` 来撑起高度。
> `padding/margin` 的 `top`/`bottom` 在 FireFox 下没有效果，但 `left` 与 `right` 有效
> `-webkit-background-clip: text;` 在 FireFox 中有效，但在 Chrome 中无效
> ... 还有其他很多属性等你探索

```js
  console.log('%cRainbowGirl', 'font-size: 40px; line-height: 60px; padding: 0 10px; color: #fff; background: linear-gradient(90deg, red 0%, orange 15%, yellow 45%, green 60%, cyan 75%, blue 90%, purple 100%)');
  console.log('%c3D TEXT', 'padding: 20px; background: #fff; color: #000; font-size: 50px; font-weight: bold; text-shadow: 1px 1px #999, 3px 3px #666;');
  // FireFox
  console.log('%cRainbowGirl', 'font-size: 40px; line-height: 60px; padding: 0 10px; color: transparent; background: linear-gradient(90deg, red 0%, orange 15%, yellow 45%, green 60%, cyan 75%, blue 90%, purple 100%);-webkit-background-clip: text;text-fill-color:transparent;');
```

### console 中的 await

我们知道在 ES2017 中新增了 `async/await` 两个关键字，用于更方便的异步操作。

```js
async function fn() {
  const n = await new Promise(resolve => {
    setTimeout(() => resolve(123), 1000);
  });
  return n;
}
fn().then(n => console.log(n));
```

`async/await` 是成对使用的。`await` 只能使用在 `async` 声明的异步函数中。

但是，浏览器中的 `console` 对象下的方法内其实也可以使用 `await`，不过这种用法只能用于直接在控制台中调试时。

如果用在 script 脚本中的话，会报语法错误。

```js
// in browser console
console.log(await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => 123)); // 123
```

```html
<!-- in web script -->
<script>
  console.log(await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => 123)); // Syntax Error
</script>
```

<!-- console demo script -->
<script>
(function () {
  // log
  var name = 'c.c.';
  console.log('I like ', name);

  // debug info
  var text = 'Without a date';
  console.debug('debug: %s', text);
  console.info('info: %s', text);

  // warn error
  var loser = '人生的败犬';
  console.warn('I am really a ', loser);
  var error = '注孤生';
  console.error('%cMy Error: %c%s', 'color: purple;', 'color: black; font: 700 22px "方正舒体", "华文行楷", simsun;', error);

  // trace
  function fn1() {
    function fn2() {
      console.trace('追溯调用位置');
    }
    fn2();
  }
  fn1();

  // time timeEnd
  console.time('Sum');
  var sum = 0;
  var end = 1000;
  for (var i = 1; i < end; i++) {
    sum += i;
    if (i === end / 2) console.timeLog('Sum');
  }
  console.log('1~1000之和: ', sum);
  console.timeEnd('Sum');

  // group groupEnd groupCollapsed
  console.group('group demo');
    console.log('program start ...');
    console.groupCollapsed('loop');
    for (var i = 0; i < 10; i++) {
      console.log(i);
    }
    console.groupEnd();
    console.log('program end ...');
  console.groupEnd();

  // profile
  function doTask() {
    doTaskA(1000);
    doTaskA(100000);
    doTaskB(10000);
    doTaskC(1000);
  }
  function doTaskA(count) {
    for(var i = 1; i < count; i++){}
  }
  function doTaskB(count) {
    for(var i = 1; i < count; i++){}
  }
  function doTaskC(count) {
    for(var i = 1; i < count; i++){}
  }
  console.profile('testTitle');
  doTask();
  console.profileEnd('testTitle');

  // table
  var arr = [{
    name: 'RWBY',
    year: 2013,
    series: 6,
  }, {
    name: 'OVERLORD',
    year: 2015,
    series: 3,
  }, {
    name: '狐妖小红娘',
    year: 2015,
    series: 5,
  }, {
    name: 'JOJO',
    year: 2012,
    series: 6,
  }];
  console.table(arr);
  console.table(arr, ['name', 'year']);

  // count countReset
  console.log('%c%s', 'font-size: 20px; color: gold; background:  DarkSlateGrey;', '记录0~10之间的奇偶数的个数')
  for (var i = 0; i < 10; i++) {
    if (i % 2) {
      console.count('odd');
    } else {
      console.count('even');
    }
  }
  console.countReset('odd');
  console.countReset('even');

  // dir dirxml
  console.dir(document.getElementById('header'));
  console.dirxml(document.getElementById('header'));

  // assert
  console.assert(1 < 2, '正确');
  console.assert(1 > 2, '判断错误');

  // memory
  console.log('memory', console.memory);

  // console object
  console.log('%c%s', 'font-size: 17px; padding: 17px; background: #888; color: purple;', 'Yakumo Yukari')
  var yakumo = {
    name: 'Yukari',
    age: Infinity,
  };
  console.log(yakumo); // You think: { name: 'Yukari', age: Infinity }, in fact: { name: 'Yukari', age: 17 }

  if (yakumo.age > 18) {
    console.log('before changed'); // this will be output
  } else {
    console.log('after changed');
  }
  yakumo.age = 17;

  // placeholder
  console.log('%s placeholder', 'hello');
  console.log('%s', {}); // => Object
  console.log('%s', []); // => Array(0)
  console.log('1 + 2 = %d', 1 + 2);
  console.log('1 + 2 = %f', 1 + 2); // 1 + 2 = 3 (FireFox: 3.000000)
  console.log('0.1 + 0.2 = %f', 0.1 + 0.2);
  console.log('1.2 + 1.3 > %i', 1.2 + 1.3);
  console.log('numeric will be %d', '123');

  console.log('小o %o', {name: 'obj'});
  console.log('大O %O', {name: 'obj'});
  console.log('小o %o', document.getElementById('header'));
  console.log('大O %O', document.getElementById('header'));
  console.log('整型d %d', 123);
  console.log('小o %o', 123);
  console.log('大O %O', 123);
  console.log('字符串s %s', 'string');
  console.log('小o %o', 'string');
  console.log('大O %O', 'string');

  console.log('%cRainbowGirl', 'font-size: 40px; line-height: 60px; padding: 0 10px; color: #fff; background: linear-gradient(90deg, red 0%, orange 15%, yellow 45%, green 60%, cyan 75%, blue 90%, purple 100%)');

  // rainbow in Chrome
  console.log('%cRainbowGirl', 'font-size: 40px; padding: 100px 80px 50px; color: #bdbdbd; background: radial-gradient(at 50% 100%, transparent 0%, transparent 35%, #8b00ff 40%, #0000ff 45%, #00ffff 50%, #00ff00 55%, #ffff00 60%, #ff7f00 65%, #ff0000 70%); background-repeat: no-repeat;background-position: 0 0; border-radius: 200px 200px 0 0;');
  // rainbow text in FireFox
  console.log('%cRainbowGirl', 'font-size: 40px; line-height: 60px; padding: 0 10px; color: transparent; background: linear-gradient(90deg, red 0%, orange 15%, yellow 45%, green 60%, cyan 75%, blue 90%, purple 100%);-webkit-background-clip: text;text-fill-color:transparent;');

  console.log('%c3D TEXT', 'padding: 20px; background: #fff; color: #000; font-size: 50px; font-weight: bold; text-shadow: 1px 1px #999, 3px 3px #666;');
  console.log('%c%s', 'color: white; font-size: 20px;', 'you cant see me.');

})()
</script>
