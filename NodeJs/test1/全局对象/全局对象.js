console.log("文件绝对路径"+__filename);

console.log("脚本所在目录"+__dirname);

//clearTimeout(t)
var num = 0;
function printHello(){
    console.log("Hello,World!");
    num++;
    if(num == 3){
    clearInterval(ti)
    console.log(num)
    }
}

var t = setTimeout(printHello,1000);
clearTimeout(t);

//setInterval(cb,ms)
var ti=setInterval(printHello,1000);


//console
console.info("程序开始执行：");

var counter = 10;
console.log("计数: %d", counter);

console.time("获取数据");
//
// 执行一些代码
// 
console.timeEnd('获取数据');

console.info("程序执行完毕。")