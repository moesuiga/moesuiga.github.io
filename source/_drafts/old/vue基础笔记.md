---
title:Vue基础学习
---

MVVM模式
MVVM拆分解释:

Model 负责数据存储
View 负责页面展示
View Model 负责业务逻辑处理（比如Ajax请求等），对数据进行加工后交给视图展示
MVVM要解决的问题是将业务逻辑代码与视图代码进行完全分离，使各自的职责更加清晰，后期代码维护更加简单

用图解的形式分析Ajax请求回来数据后直接操作Dom来达到视图的更新的缺点，以及使用MVVM模式是如何来解决这个缺点的

MVVM架构

vue的使用
首先引入vue.js文件

再创建一个Vue实例

```html
<div id="app">
    {{name}}
</div>
```

```js
var vm = new Vue({
    el: "#app",
    data: {
        name: "Yang"
    }
})
```

其中el属性相当于MVVM中的View，它指示一个DOM元素，将其作为操作视图的区域范围，如果是类名这种可能选中多个的则选中第一个符合要求的。
data属性相当于MVVM中的Model，它负责视图区域的数据信息。
而vm这个实例对象就是MVVM中的View Model，

v-on 注册事件

```html
<div id="app">
    {{name}}
    <button v-on:click="change">change</button>
</div>
```

```js
new Vue({
    el: "#app",
    data: {
        name: "Yang"
    },
    methods: {
        change: function(){
            this.name = "Yange Xiaolong";
        }
    }
})
```

v-on: 可以简写成 @

v-text/v-html防止闪烁
通过将数据绑定到v-text/v-html上，等到加载到该实例时，再渲染该数据。

```html
<div id="app">
    <div v-text="title"></div>
    <div v-html="title"></div>
</div>
```

```js
new Vue({
    el: "#app",
    data: {
        title: "<h1>标题</h1>"
    }
})
```

v-text不能解析html标签，v-html会将字符串中的html标签解析出来

v-cloak防止闪烁
通过配合样式

```css
[v-cloak] {
    display: none;
}
```

先隐藏，等到加载到该实例时，移除v-cloak属性，再显示，达到消除闪烁问题。

v-bind单向数据绑定
可以通过v-bind:atrribute="dataName"绑定数据
可以简写成:attribute="dataName"。
如果属性值既有常量部分又有变量部分，可以写成
v-bind="{attribute: 'constant'+variate}"

v-model双向数据绑定
只能作用于表单控件的input、select、textarea和组件component上

修饰符：
vue1.0 版本使用时作为标签属性添加
vue2.0 版本使用时作为v-model的属性使用

```html
<!-- number: 将表单中的数字变成number类型 -->
<!-- vue1.0 -->
<input type="text" v-model="age" number>
<!-- vue2.0 -->
<input type="text" v-model.number="age">
<!-- trim：自动清除文本框两侧的空白符 -->
<!-- vue2.0 -->
<input type="text" v-model.trim="username">
```

v-for循环
vue1.0与vue2.0的区别

vue1.0有系统索引$index，而vue2.0中没有了
vue1.0中v-for="(index,item) in items"索引在前，值在后，
vue2.0中v-for="(item,index) in items"索引在后，值在前
在vue1.0中，数组如果有相同元素的话，必须添加属性 track-by="$index" 区分，否则会出现错误，而vue2.0则不会。不过也建议在vue2.0中添加上:key="index"属性进行缓存优化。
循环对象时，vue1.0与循环数组时相同，前面是key，后面是value；而vue2.0处理可以两个参数获取value和key值外，还可以使用三个参数v-for="(value,key,index) in object"，第一个参数是键值，第二个参数是键名，第三个参数是索引。

```html
<ul id="app">
    <!-- vue1.0 -->
    <li v-for="(index,item) in rwby" track-by="$index">rwby队第{{index+1}}位：{{item.name}}的代表色是{{item.color}}</li>
    <!-- vue2.0 -->
    <li v-for="(item,index) in rwby" :key="index">rwby队第{{index+1}}位：{{item.name}}的代表色是{{item.color}}</li>
</ul>
```

```js
new Vue({
    el: "#app",
    data: {
        rwby: [
            {
                name: "Ruby",
                color: "red"
            },
            {
                name: "Weiss",
                color: "white"
            },
            {
                name: "Blake",
                color: "black"
            },
            {
                name: "Yang",
                color: "yellow"
            }
        ]
    }
})
```

v-if和v-show判断是否渲染元素
都能实现对元素的隐藏与显示操作，但是
v-if是将元素添加或移除DOM树
v-show是给元素添加display:none实现隐藏

```
<div id="app">
    <button @click="toggle">切换</button>
    <div v-if="isShowing">v-if为false时，不在DOM树上渲染</div>
    <div v-show="isShowing">v-show为false时，只是通过display:none;隐藏，还会渲染到DOM上</div>
</div>
```

```js
new Vue({
    el: "#app",
    data: {
        isShowing: true
    },
    methods: {
        toggle: function(){
            this.isShowing = !this.isShowing;
        }
    }
})
```

过滤器
系统过滤器（vue1.0有效）
filterBy
限制：必须是一个数组
v-for="item in items | filterBy 'xxx'
这是在数组中的每一项中过滤有’xxx’的数据，如果item是一个对象，会遍历该对象中的所有属性，如果想要更细致的过滤条件，可以写成
v-for="user in users | filterBy 'xxx' in 'name'
这样会查找姓名中带有’xxx’的所有用户

currency过滤器，转换为货币形式，默认$
json过滤器，将对象转成json格式字符串
uppercase过滤器，将字母全部转成大写
lowercase过滤器，将字母全部转成小写
…

自定义过滤器
私有过滤器
在某个vue对象内部定义的过滤器称之为私有过滤器
这种过滤器只有在当前vue对象el指定的监管区域有用

```html vue
<div id="app">
    {{time | dateFmt}}
</div>
```

```js vue
new Vue({
    el: "#app",
    data: {
        time: new Date()
    },
    methods: {
        addZero: function(n){
            return n < 10 ? '0' + n : n;
        }
    },
    filters: {
        // input是自定义过滤器的默认参数，input值永远都是取自|左边的内容
        dateFmt: function(input){
            // 过滤器的逻辑: 时间格式化yyyy-MM-dd HH:mm:ss
            var year = input.getFullYear();
            var month = input.getMonth()+1;
            month = this.addZero(month);
            var day = input.getDate();
            day = this.addZero(day);
            var hour = input.getHours();
            hour = this.addZero(hour);
            var min = input.getMinutes();
            min = this.addZero(min);
            var sec = input.getSeconds();
            sec = this.addZero(sec);
            var ap = parseInt(hour, 10) > 12 ? '下午' : '上午';
            return `${year}-${month}-${day} ${ap} ${hour}:${min}:${sec}`;
        }
    }
});
```

全局过滤器
想要在全局所有的vue对象都能访问某个过滤器的话，就需要定义一个全局的过滤器。
通过Vue.filter()方法定义，它接收两个参数，第一个参数是过滤器的名字，第二个参数是逻辑函数。

```html Vue filter
<div id="app">
    {{time | dateFmt}}
</div>
<div id="app1">
    {{time | dateFmt}}
</div>
```

```js Vue.filter
Vue.filter('dateFmt', function(input){
    // 过滤器的逻辑: 时间格式化yyyy-MM-dd HH:mm:ss
    var year = input.getFullYear();
    var month = input.getMonth()+1;
    month = this.addZero(month);
    var day = input.getDate();
    day = this.addZero(day);
    var hour = input.getHours();
    hour = this.addZero(hour);
    var min = input.getMinutes();
    min = this.addZero(min);
    var sec = input.getSeconds();
    sec = this.addZero(sec);
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
});

Vue.prototype.addZero = function(n){
    return n < 10 ? '0' + n : n;
}

new Vue({
    el: "#app",
    data: {
        time: new Date()
    }
});

new Vue({
    el: "#app1",
    data: {
        time: new Date()
    }
});
```
