/*event.js 文件
EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。
当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。*/

var events = require("events");
var emitter = new events.EventEmitter();

emitter.on("someEvent",function(arg1,arg2){
    console.log('listener1',arg1,arg2);
})

emitter.on("someEvent",function(arg1,arg2){
    console.log('listener2',arg2,arg2);
    console.info("\n")
})

emitter.emit('someEvent','arg1 参数','arg2 参数');

/*EventEmitter属性介绍
方法
*/
var events = require("events");
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listner1 = function listner1(){
    console.log('监视器listner1执行 ')
}
// 监听器 #2
var listner2 = function listner2(){
    console.log('监视器listner2执行，通过on绑定connection事件，')
}
// 绑定 connection 事件，处理函数为 listner1 
eventEmitter.addListener('connection',listner1);
// 绑定 connection 事件，处理函数为 listner2
eventEmitter.on('connection',listner2);


var eventListeners = require("events").EventEmitter.listenerCount(eventEmitter,'connection');

console.log(eventListeners + "个：监听器监听连接事件。")
console.info("\n")

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listner1 函数
eventEmitter.removeListener('connection',listner1);
console.log("移除后，listner1不再受监听"+'\n')

// 触发连接事件
eventEmitter.emit('connection')