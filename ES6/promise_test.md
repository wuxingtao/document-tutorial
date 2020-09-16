## Promise 简介

>一个 Promise 就是一个代表了异步操作最终完成或者失败的结果对象

### 约定
不同于老式的传入回调，在应用 Promise 时，我们将会有以下约定：

* 在 JavaScript 事件队列的当前运行完成之前，回调函数永远不会被调用。
* 通过 .then 形式添加的回调函数，甚至都在异步操作完成之后才被添加的函数，都会被调用，如上所示。
* 通过多次调用 .then，可以添加多个回调函数，它们会按照插入顺序并且独立运行。
* 因此，Promise 最直接的好处就是链式调用。

## 应用

### 链式调用

### 在旧式回调 API 中创建 Promise
 Promise通过它的构造器从头开始创建。 只应用在包裹旧的 API。

理想状态下，所有的异步函数都已经返回 Promise 了。但有一些 API 仍然使用旧式的被传入的成功或者失败的回调。典型的例子就是setTimeout()函数：
`setTimeout(() => saySomething("10 seconds passed"), 10000);`
混用旧式回调和 Promise 是会有问题的。如果 saySomething  函数失败了或者包含了编程错误，那就没有办法捕获它了。

幸运的是我们可以用 Promise 来包裹它。最好的做法是将有问题的函数包装在最低级别，并且永远不要再直接调用它们：

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
wait(10000).then(() => saySomething("10 seconds")).catch(failureCallback);
```
通常，Promise 的构造器会有一个可以让我们手动操作resolve和reject的执行函数。既然 setTimeout 没有真的执行失败，那么我们可以在这种情况下忽略reject。

### 组合
`Promise.resolve()` 和 `Promise.reject()` 是手动创建一个已经resolve或者reject的promise快捷方法。它们有时很有用。

`Promise.all()` 和 `Promise.race()`是并行运行异步操作的两个组合式工具。

时序组合可以使用一些优雅的javascript形式：
```js
[func1, func2].reduce((p, f) => p.then(f), Promise.resolve());
```

通常，我们递归调用一个由异步函数组成的数组时相当于一个 Promise 链式：
```js
Promise.resolve().then(func1).then(func2);
```

我们也可以写成可复用的函数形式，这在函数式 编程中极为普遍：
```js
let applyAsync = (acc,val) => acc.then(val);
let composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
```

composeAsync函数将会接受任意数量的函数作为其参数，并返回一个新的函数，该函数接受一个通过composition pipeline传入的初始值。这对我们来说非常有益，因为任一函数可以是异步 或同步的，它们能被保证按顺序执行：
```js
let transformData = composeAsync(func1, asyncFunc1, asyncFunc2, func2);
transformData(data);
```

在 ECMAScript 2017标准中, 时序组合可以通过使用async/await而变得更简单：

```js
for (let f of [func1, func2]) {
  await f();
}
```

### 嵌套
简便的 Promise 链式编程最好保持扁平化，不要嵌套 Promise，嵌套经常会是粗心导致的。可查阅下一节的常见错误中的例子。

### 时序
为了避免意外，即使是一个已经变成 resolve 状态的 Promise，传递给 then 的函数也总是会被异步调用：
```js
Promise.resolve().then(() => console.log(2));
console.log(1); // 1, 2
```

## 测试
```js
/*Promise.resolve() 已完成*/
function a1 (value) {
    console.log(value)
    console.log('a1');
    return Promise.resolve(value)
}

function b1 (value) {
    console.log('b1');
}

function a2 (value) {
    console.log(value)
    console.log('a2');
    return Promise.reject(value)
}

function b2 (value) {
    console.log('b2');
}


var config = {"method":"get"}
// Promise.resolve(config).then(a1,b1).then(a2,b2)
var promise = Promise.resolve(config).then(a1,b1)

/*Promise 可复用函数形式*/
var applyAsync = (acc,val) => acc.then(val);
var composeAsync = (...funcs) => x => funcs.reduce(applyAsync, Promise.resolve(x));
var transformData = composeAsync(a1, b1, a2, b2);
transformData(config);

/*Promise链式调用应用*/
var chain = []
chain.push(a1,b1,a2,b2)
var promise = Promise.resolve({"method":"get"})
while(chain.length){
        console.log(chain)
    promise = promise.then(chain.shift(),chain.shift())
}
```

```js
//链式调用使用
function start() {
  return new Promise((resolve, reject) => {
    resolve('start');
  });
}

start()
  .then(data => {
    // promise start
    console.log('result of start: ', data);
    return Promise.resolve(1); // p1
  })
  .then(data => {
    // promise p1
    console.log('result of p1: ', data);
    return Promise.reject(2); // p2
  })
  .then(data => {
    // promise p2
    console.log('result of p2: ', data);
    return Promise.resolve(3); // p3
  })
  .catch(ex => {
    // promise p3
    console.log('ex: ', ex);
    return Promise.resolve(4); // p4
  })
  .then(data => {
    // promise p4
    console.log('result of p4: ', data);
  });

//   result of start:  start
//   result of p1:  1
//   ex:  2
//   result of p4:  4
```

## 参考
[Promise 的链式调用与中止](https://cnodejs.org/topic/58385d4927d001d606ac197d)

> <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">知识共享署名-非商业性使用 4.0 国际许可协议</a>进行许可。
