//process 是一个全局变量，即 global 对象的属性。
//它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。

/*process.on('exit', function(code) {
    // 以下代码永远不会执行
    setTimeout(function() {
        console.log("该代码不会执行");
    }, 0);

    console.log('退出码为:', code);
});
console.log("程序执行结束");*/

//process 属性
process.stdout.write("Hello World" + "\n");

process.argv.forEach(function(val,index,array){
    console.log(index + ':' + val);
});

console.log("\n" + process.execPath)

console.log(process.platform + "\n")

//process 方法

// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());