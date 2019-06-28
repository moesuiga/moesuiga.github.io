---
en_title: console function
title: console function
keywords: js, javascript, console, 控制台
description: 控制台console的一些方法记录
category:
  - JavaScript
tags:
  - console
date: 2018-1-7 18:11:53
photos:
  - https://miao.su/images/2019/02/23/16d2d6.jpg
---

### log

在控制台打印内容，一般的用法就是`console.log(info[,info,...])`。
然后还有一个比较有趣的用法，第一个参数中可以包含格式化占位符。

```
console.log('%s未来的你是否笑着，连神明都不知道', '别太担忧晚年如何，');
//=> 别太担忧晚年如何，未来的你是否笑着，连神明都不知道
```
<!-- more -->
<script>
  console.log('%s未来的你是否笑着，连神明都不知道', '别太担忧晚年如何，');
</script>

格式化占位符列表：

| 占位符 |          意义          |
|--------|------------------------|
|   %s   |          字符串        |
| %d, %i | 整型（暂不支持数字型） |
|   %f   |浮点型（暂不支持数字型）|
|   %o   |         链接对象       |
|   %c   |     CSS格式字符串      |

可以通过`%c`占位符给输出的文本添加一些样式，比如更大的字号、更醒目的颜色、添加背景色等，使得输出更加醒目。

<script>
  console.log('%c%s', 'color: white; font-size: 20px;', '假装隐身')
</script>

### debug/info

console.log的别名，
~~不过console.info会在输出的文本前加上一个小三角标示。~~
不过`debug`不输出。
<script>
  {
    var text = 'Without a date'
    console.debug('debug 不输出');
    console.info('info: ',text);
  }
</script>

### warn

在控制台输出一条带有“警告”图标的消息和一个指向该代码调用的追溯引用信息

<script>
  {
    var loser = '人生的败犬';
    console.warn('I am really a ', loser);
  }
</script>

### error

在控制台输出一条带有“错误”图标的消息和一个指向该代码调用的追溯引用信息

<script>
  {
    var error = '注孤生';
    console.error('%c%s%c%s', 'color: purple;', 'My Error: ', 'color: black; font: 700 22px "方正舒体", "华文行楷", simsun;', error);
  }
</script>

### trace

在控制台输出该代码调用的追溯引用信息

<script>
  (function trace() {
    console.trace('追溯调用位置')
  })();
</script>

### time/timeEnd

`console.time(name)`创建一个名字为name的计时器，`console.timeEnd(name)`停止该计时器，并输出从创建到停止所耗的时间（毫秒）。常用来查看代码运行的效率性能。

<script>
  {
    console.time('1~1000之和用时');
    var sum = 0;
    for (var i = 1; i < 1000; i++) {
      sum += i;
    }
    console.timeEnd('1~1000之和用时');
    console.log('sum: ', sum);
  }
</script>

### group/groupEnd/groupCollapsed

`group`方法输出一条消息，并打开一个嵌套块，块中的内容都会缩进，调用`console.groupEnd()`关闭块。
`groupCollapsed`方法与`group`方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的，而不是展开的。

<script>
  console.group('group 1');
  console.log('%c%s', 'font-size: 22px; color: orange;', 'in group 1');
  console.groupCollapsed('collapsed group 2');
  console.warn('in collapsed group 2');
  console.groupEnd();
  console.groupEnd();
</script>

### profile/profileEnd

`console.profile([title])`打开JavaScript性能测试开关，可选参数title会在打印性能测试报告时在报告的开头输出。

<script>
  {
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
  }
</script>

### table

对于某些复合类型的数据，`console.table(object)`方法可以将其转为表格显示。条件是必须拥有主键。
对于数组来说，主键就是数字键；对于对象来说，主键就是它的最外层键。

```
var o = {
    arr: [5, 4, 3, 2, 1],
    str: 'string',
    num: 123,
    bool: true,
    null: null
};
console.table(o);
/*
    ---------------------------------------------------
    | (index) | 0 | 1 | 2 | 3 | 4 | length |   Value  |
    |-------------------------------------------------|
    | arr     | 5 | 4 | 3 | 2 | 1 |    5   |          |
    | str     |   |   |   |   |   |        | "string" |
    | num     |   |   |   |   |   |        | 123      |
    | bool    |   |   |   |   |   |        | true     |
    | null    |   |   |   |   |   |        | null     |
    ---------------------------------------------------
    > object
 */
```

<script>
  {
    var o = {
      arr: [5, 4, 3, 2, 1],
      str: 'string',
      num: 123,
      bool: true,
      null: null
    };
    console.table(o);
  }
</script>

### count

计数器，输出它被调用了多少次，有一个可选参数，会在显示计数时在开头输出，并用于区分不同的计数器。

<script>
  {
    function count(n) {
      if (n % 2) {
        console.count('odd');
      } else {
        console.count('even');
      }
    }
    console.log('%c%s', 'font-size: 20px; color: gold; background:  DarkSlateGrey;', '记录0~10之间的奇偶数的个数')
    for (var i = 0; i < 10; i++) {
      count(i);
    }
  }
</script>

### dir/dirxml

`dir`方法用来对一个对象进行检查，并以易于阅读和打印的格式显示，该方法对于输出DOM对象非常有用。
`dirxml`方法主要用于以目录树的形式，显示DOM节点。如果参数不是DOM节点，而是普通的JavaScript对象，`console.dirxml`等同于`console.dir`。

<script>
  console.dir(document.getElementsByTagName('p')[0])
</script>

### assert

`assert`方法主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序的执行。这样就相当于提示用户，内部状态不正确。

它接收两个参数，第一个是表达式，第二个是字符串。只有当第一个参数为`false`时，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果。

```
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

<script>
  console.assert(true, '正确');
  console.assert(false, '错误');
</script>

### clear

clear方法用于清除当前控制台的所有输出，将光标回置到第一行。
