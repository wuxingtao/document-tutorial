---
author: Wu xingtao
date: March 22, 2018
output:
  word_document:
    highlight: "tango"
---

参考:
[为什么react的组件要super(props)](https://segmentfault.com/q/1010000008340434)

```js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

export default class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
      </View>
    );
  }
}
```


我知道supert是继承constructor的参数，但是为什么在react里面，有一些组件使用了super(props)，而有一些没有写，还有在es6里就只是写了supert()，这些区别在哪呢？以及这里的这个constructor(props)...super(props)是起到什么作用呢


1. 调用super的原因：在ES6中，在子类的constructor中必须先调用super才能引用this
2. super(props)的目的：在constructor中可以使用this.props
3. 最后，可以看下React文档，里面有一段
>Class components should always call the base constructor with props.



#### 假设在es5要实现继承,首先定义一个父类:

```js

//父类
function sup(name) {
    this.name = name
}
//定义父类原型上的方法
sup.prototype.printName = function (){
    console.log(this.name)
}
```
现在再定义他sup的子类，继承sup的属性和方法:

```js
function sub(name,age){
    sup.call(this,name)    //调用call方法,继承sup超类属性
    this.age = age
}    

sub.prototype = new sup   //把子类sub的原型对象指向父类的实例化对象，这样即可以继承父类sup原型对象上的属性和方法
sub.prototype.constructor = sub    //这时会有个问题子类的constructor属性会指向sup，手动把constructor属性指向子类sub
//这时就可以在父类的基础上添加属性和方法了
sub.prototype.printAge = function (){
    console.log(this.age)
}
```

这时调用父类生成一个实例化对象:

```js
    let jack = new sub('jack',20)
    jack.printName()    //输出 : jack
    jack.printAge()    //输出 : 20
```    
这就是es5中实现继承的方法。
而在es6中实现继承:
```js
    class sup {
        constructor(name) {
            this.name = name
        }
    
        printName() {
            console.log(this.name)
        }
    }
```
```js
class sub extends sup{
    constructor(name,age) {
        super(name) // super代表的事父类的构造函数
        this.age = age
    }

    printAge() {
        console.log(this.age)
    }
}

let jack = new sub('jack',20)
    jack.printName()    //输出 : jack
    jack.printAge()    //输出 : 20

```    
对比es5和es6可以发现在es5实现继承，在es5中实现继承:

1. 首先得先调用函数的call方法把父类的属性给继承过来
2. 通过new关键字继承父类原型的对象上的方法和属性
3. 最后再通过手动指定constructor属性指向子类对象

而在es6中实现继承，直接调用super(name)，super是代替的是父类的构造函数，super(name)相当于sup.constructor.call(this, name).


> <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br />本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">知识共享署名-非商业性使用 4.0 国际许可协议</a>进行许可。
