---
title: "es6 intro"
author: Wu xingtao
date: March 22, 2018
output:
  word_document:
    highlight: "tango"
presentation:
  theme: white.css
  width: 1200
  height: 800
  transition: 'convex'
  backgroundTransition: 'convex'
---



<!-- slide -->
## ECMAScript(ES6)
Javascript的下一版本

(吴星涛)


<!-- slide -->
## 为什么要使用 ES6 ?


<!-- slide -->
### 关于ES6
ECMAScript6.0（简称ES6)是JavaScript语言的下一代标准，于2015.6正式发布；

    目的: 提供了大量复杂度不同的特性, 来满足不同复杂程度的应用开发;
    ECMAScript和JavaScript的关系，简单来说;
    ECMAScript是JavaScript语言的国际标准;
    JavaScript是ECMAScript的实现。


<!-- slide vertical=true -->
### 浏览器兼容
<!-- <iframe src="https://skydrive.live.com/embed?cid=8B504C1595CD3973&resid=8B504C1595CD3973%2126382&authkey=AJzDcN30q6g4W0Y&em=2" width="700px" height="500px" frameborder="0" scrolling="no"></iframe> -->
ES6的支持在主流桌面浏览器中表现良好


```mermaid

graph TD

    Chrome-->|90% sp|SVN((ECMAScript6))

    Edge-->|80% sp|SVN

    Safari-->|54% sp|SVN

    Android-->|31% sp|SVN

    iOS-->|54% sp|SVN

    <!-- SVN---|store the data|sharedrive -->

```

<!-- slide vertical=true -->
### 试用ES6

![](https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/1ffd23164a4166f4876b0b0a32ccb4a58d51bfbd07edcef5ecf88a89ed62462385aed11942251582d6fd4e3a29f645c2?pictype=scale&from=30113&version=3.3.3.3&uin=540850871&fname=babel.PNG&size=750)


<!-- slide vertical=true -->
### 试用ES6

![](https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/083f3e64f030c04860d08b83119143bc8c2cd1d12b0e130d8945335edb9c7ab5c15a04c902913db2036c73deccbf7397?pictype=scale&from=30113&version=3.3.3.3&uin=540850871&fname=babel1.PNG&size=750)


<!-- slide vertical=true -->
### 马上使用ES6
ES6预处理器意味着JavaScript交叉编译回旧版浏览器的ES5兼容代码，这意味着没有理由推迟了解它。


* Traceur转码器在线编译

```html
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
<script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
<script type="module">
import './Greeter.js';
</script>
```

<!-- slide vertical=true -->
### 马上使用ES6
1.babel全局编译

```js
npm install -g babel-cli
//.babelrc
{
    "presets":[
        "es2015"
    ],
    "plugins":[]
}

//run
`babel example.js --out-file compiled.js //编译输出`
`babel src -d lib`  //编译成新的目录
```

<!-- * webstorm 配置babel： file - setting - tools - File Watcher, -->

<!-- slide vertical=true -->
### 马上使用ES6


2. gulp编译
```js
gulp.task('babel',()=>{
  gulp.src('build/js/*.js')
      .pipe(babel({presets:['es2015']}))
      .pipe(gulp.dest('build/ES6'))
      ...
})
```
<!-- slide vertical=true -->
### 马上使用ES6

3. webpack 编译
```js
    module:{
      rules:[
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['babel-preset-env']
            }
          }
        }
      ]
    }

```


<!-- slide -->
### ES6 酷特性

* 变量(let)和常量(const)
* 解构赋值
* 函数参数默认值
* For-of 迭代器
* 箭头函数 =>
* Promise/async await
* 模块(Modules)
* 类(Classed)

<!-- slide -->
#### Let 与 Const

* 使用Var   

var定义的变量未函数级作用域(`ps:var定义的变量是全局变量或者函数变量`)：
```js
{
  var a = 10;
}
console.log(a); // 输出10
```
* 使用let与const  

let定义的变量为块级作用域，因此会报错：
```js
{
  let a = 10;
}
console.log(a); // 报错“ReferenceError: a is not defined”
```
const与let一样，也是块级作用域。


<!-- slide vertical=true -->
#### Let 与 Const
1. var声明可以多次重复声明同一个变量，let不行

2. let变量只在块级作用域里面有效果，var 变量不存在块级作用域

3. let变量不会声明提前，var变量会

```js
//多次声明
var a=123;
function a(){ return 1 }
console.log(a);//123
//多次声明
function a(){ return 1 }
var a;
a();//1

//输出 10个10
for(var i=0;i<10;i++){
setTimeout(function(){console.log(i)},1000);
}

//输出0-9
for(let i=0;i<10;i++){
setTimeout(function(){console.log(i)},i*1000);
}

//var 声明提前
console.log(a);  //不会出错，会输出undefined
var a=10;
console.log(a); //10
```

<!-- slide  -->
#### 解构赋值

当需要获取某个对象的属性值时，需要单独获取
```js
var data = $('body').data(); // data有house和mouse属性
var house = data.house;
var mouse = data.mouse;
```


* 使用ES6
一次性获取对象数组属性：
```js
var { house, mouse} = $('body').data()
var [col1, col2]  = $('.column');

```
<!-- slide vertical=true -->
#### 解构赋值
1. 字符串解构
```js
const [a, b, c, d, e] = 'hello';
```

2. 变量解构
```js
let [a, b, c] = [1, 2, 3];
```

```js
//扩展运算符 spread(...)
let [head, ...tail] = [1, 2, 3, 4];
//head:1
//tail [2,3,4]
```

<!-- slide vertical=true -->
#### 解构赋值
3. 对象解构

对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined

//对象与数组解构嵌套
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;
```


<!-- slide -->
#### 函数参数默认值
* 不使用ES6


```js
function foo(height, color)
{
    var height = height || 50;
    var color = color || 'red';
    //...
}
foo(0, "", "")  //存在布尔值为false情况
```

* 使用ES6

```js
function foo(height = 50, color = 'red')
{
    // ...
}
```

<!-- slide -->
#### For-of 迭代器/遍历器
- `ES6引入了全新的迭代器概念,允许我们在语言级别定义序列`

  遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
  一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

- `Iterator 数据结构`:

  ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

- `Iterator 的作用有三个`：

  * 一是为各种数据结构，提供一个统一的、简便的访问接口；
  * 二是使得数据结构的成员能够按某种次序排列；
  * 三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费;





<!-- slide vertical=true -->

* for-in for-of 简单区别

for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值

```js
var list = [3, 5, 7];
list.foo = 'bar';
//for-in循环能够枚举继承的属性名，所以在数组上不建议使用for-in循环。
for (var key in list) {
  if(!a.hasOwnProperty(i)) continue;//跳过继承的属性
  console.log(key); // 0, 1, 2, foo
}

for (var value of list) {
  console.log(value); // 3, 5, 7
}
```

- `不建议for-in循环遍历数组还有以下原因: `
```
代码中的index不是数字，是字符串“0”、“1”、“2”，可能无意间进行字符串的计算“2”+1=“21”等。
代码可能按照随机顺序遍历数组元素。
所以for-in更适合遍历对象，可以遍历字符串型的键。
ps：属性的枚举性还会影响以下两个函数的结果:  Object.keys() ;  JSON.stringify();  它们只能返回对象本身具有的可枚举属性。
```

<!-- slide vertical=true -->

#### for-in for-of 简单区别

#### `for-of与forEach不同`
支持break、continue、return。同时又避开了for-in 的缺点。

#### `for-of遍历支持数据类型`

* 数组
* 大多数类数组对象：如DOM的NodeList对象
* 字符串
* 也支持map和set对象的遍历
  



<!-- slide -->
#### 箭头函数 =>
ES6 允许使用简单的'=>'而不是传统的函数表达式来声明一个函数;
箭头函数相当于匿名函数，并且简化了函数定义。

#### 箭头函数有两种格式
  1. 只包含一个表达式，连{ ... }和return都省略掉了。
  2. 可以包含多条语句，这时候就不能省略{ ... }和return：

```js
//demo
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

<!-- slide vertical=true -->
#### 箭头函数 =>
如果要返回一个对象，就要注意，如果是单表达式，需要`({})`

```js
// SyntaxError:
x => { foo: x }
```

```js
// ok:
x => ({ foo: x })
```


<!-- slide vertical=true -->
#### 箭头函数 =>

`ps:与之前函数调用不同的是,arrow function 直接围绕它的上下文中继承"this"和"arguments",
而不是在它们内部范围内进行区分.`

- 不使用ES6
```js
function foo() 
{
    console.log(this.id);
}

var id = 1;

foo(); // 输出1

foo.call({ id: 2 }); // 输出2

```
- 使用ES6
```js
var foo = () => {
  console.log(this.id);
}

var id = 1;

foo(); // 输出1

foo.call({ id: 2 }); // 输出1

```

<!-- slide vertical=true -->
#### 箭头函数 =>

* this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。

```js
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```

<!-- slide vertical=true -->

![](https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/32b42cb780a3e39587088ca833e51e8b415a33691cedea2822b9aec022bdcae06b34194fa3841e0e2d8b2e605a7f402e?pictype=scale&from=30113&version=3.3.3.3&uin=540850871&fname=timg.jpg&size=750)

<!-- slide vertical=true -->
在一个vue项目中使用箭头函数,this并不指向vue实例问题,this undefined导致报错
```js
//api.js
export const getRoleDetailList = (param) => fetch.post('/api/info', param)
//demo.js
import {getRoleDetailList} from 'api'
created:function(){
		getRoleDetailList({ id: 125 }).then(function (res) {
			console.log(this) //undefined
		})
}
```

`正确写法`
```js
//写法一
created:function(){
  let _this = this
		getRoleDetailList({ id: 125 }).then(function (res) {
			console.log(_this)
		})
}
//写法二: 或者通过babel编译自动生成_this
created:function(){
		getRoleDetailList({ id: 125 }).then(res =>{
      console.log(this)
    })
}

```

<!-- slide -->
#### Promise/async await


-  Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

-  它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。

-  Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
  <!-- 店老板买了, -->
  <!-- * Promise: 约定
  * resolve: 解决
  * reject: -->

<!-- slide vertical=true -->
#### Promise/async await
* 不使用ES6

```js
setTimeout(function()
{
    console.log('Hello'); // 1秒后输出"Hello"
    setTimeout(function()
    {
        console.log('Fundebug'); // 2秒后输出"Fundebug"
    }, 1000);
}, 1000);
```
* 使用ES6
```js
var wait1000 = new Promise(function(resolve, reject)
{
    setTimeout(resolve, 1000);
});

wait1000
    .then(function()
    {
        console.log("Hello"); // 1秒后输出"Hello"
        return wait1000;
    })
    .then(function()
    {
        console.log("Fundebug"); // 2秒后输出"Fundebug"
    });
```
<!-- slide vertical=true -->
#### Promise/async await
* async 函数 - 异步处理
ES2017 标准引入了 async 函数，作为Generator 函数的语法糖。使得异步操作变得更加方便。
async函数的返回值是 Promise 对象,async函数可以理解为多个异步操作，包装成的一个 Promise 对象,await命令就是内部then命令的语法糖。

`ps应用:目前async函数在如Node,npm package 使用率都很高`

1. async 表示这是一个async函数，await只能用在这个函数里面,表明该函数内部有异步操作。调用该函数时，会立即返回一个Promise对象。
2. await 表示在这里等待promise异步操作返回结果了，再继续执行后面语句。
3. await 后面跟着的应该是一个promise对象

```js
var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};
var start = async function () {
    // 在这里使用起来就像同步代码那样直观
    console.log('start');
    await sleep(3000);
    console.log('end');
};
start();
//start
//..3s
//end
```

<!-- slide -->

#### 模块(Modules)

requirejs,jquery  seajs 对应AMD,CMD规范,还是有layui都具备模块化
```js
//

//seajs
define(function(requre,exports,module){
    var $ = require('jquery');
    require("fullpage")($)  ////jquery plugin module use
    $(function(){
        
    })
})

// requirejs
define(  
    "myModule",  
    ['foo','bar'],  
    function (foo,bar){  
        var myModule={  
            fn:function(){  
                console.log("hello");  
            }  
        };  
        return myModule;  
    }  
)  
```

<!-- slide vertical=true -->
#### 模块(Modules)
* 不使用ES6

采用CommenJS规范实现了模块化
```js

//main.js中使用require导入module.js：
module.exports = {
  port: 3000,
  getAccounts: function() {
    ...
  }
}

//main.js中使用require导入module.js：
var service = require('module.js')
console.log(service.port) // 输出3000

```

<!-- slide vertical=true -->
#### 模块(Modules)
* 使用ES6

ES6中使用export与import关键词实现模块化。

```js
//module.js中使用export导出port变量和getAccounts函数：
export var port = 3000
export function getAccounts(url) {
  ...
}

//main.js中使用import导入module.js，可以指定需要导入的变量：
import {port, getAccounts} from 'module'
console.log(port) // 输出3000

//也可以将全部变量导入：
import * as service from 'module'
console.log(service.port) // 3000

```

<!-- slide -->
#### 类(Classed)

* 不使用ES6

使用构造函数创建对象：
```js
function Point(x, y)
{
    this.x = x;
    this.y = y;
    this.add = function()
    {
        return this.x + this.y;
    };
}

var p = new Point(1, 2);

console.log(p.add()); // 输出3

```

<!-- slide vertical=true -->
#### 类(Classed)
* 使用ES6

  使用Class定义类，更加规范，且你能够继承：
```js
class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    add()
    {
        return this.x + this.y;
    }
}

var p = new Point(1, 2);

console.log(p.add()); // 输出3

```

<!-- slide vertical=true -->
#### 类(Classed)

ES6的class可以看作只是一个语法糖,它的绝大部分功能,ES5都可以做到,新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

* 总结
  - 定义class的方法很简单，加上关键字class就行了。
  - 定义类的时候默认使用的是严格模式(严格模式下，this不能指向全局变量)。
  - 类的方法内部如果含有this，它默认指向类的实例;
  - {aa} 单独使用方法,需要在构造方法constructor中绑定this.aa.bind(this);
  - constructor表明构造函数,默认存在。
  - 成员方法前不需要加function。
  - 用new关键字就能生成对象,new对象时，其实就是调用prototype上的构造函数
 


<!-- slide vertical=true -->
#### 类(Classed)
p.constructor === Point.prototype.constructor为true,constructor构造函数是被定义在类的prototype对象上的
```js
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
}
let p = new Point(2,3);
console.log(p.toString());  //(2, 3)
console.log(p.constructor === Point.prototype.constructor); //true
console.log(Point.prototype.constructor === Point);     //true

```
<!-- slide vertical=true -->
#### 类(Classed)
Point.prototype.constructor === Point为true表明prototype对象的constructor属性，直接指向“类”本身，这与ES5的行为是一致的。
```js
class Point {
    constructor() { ... }
    toString() { ... }
}

// 等价于
Point.prototype = {
    constructor() { ... },
    toString(){}
};
```  


> <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">知识共享署名-非商业性使用 4.0 国际许可协议</a>进行许可。
