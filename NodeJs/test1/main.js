// //阻塞性写法
/*var fs=require("fs");

var data = fs.readFileSync('mainIn.txt');

console.log(data.toString());
console.log("程序执行结束")*/


//非阻塞性写法：   不需要等待文件读取完，这样就可以在读取文件时同时执行接下来的代码，大大提高了程序的性能。
var fs= require("fs");

fs.readFile('mainIn.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!"); //同时输出

