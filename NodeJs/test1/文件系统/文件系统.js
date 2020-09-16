var example1 = function(){
    var fs = require("fs");

    // 异步读取
    fs.readFile('E:\\MySoftware\\baidu\\百度云同步盘\\WEB素材整理\\【exe】xtTest\\jsTest\\nodeJs\\input.txt', function (err, data) {
       if (err) {
           return console.error(err);
       }
       console.log("异步读取: " + data.toString());
    });

    // 同步读取
    var data = fs.readFileSync('E:\\MySoftware\\baidu\\百度云同步盘\\WEB素材整理\\【exe】xtTest\\jsTest\\nodeJs\\input.txt');
    console.log("同步读取: " + data.toString());

    console.log("程序执行完毕。" + "\n");



}

example1()


/*fs.open(path, flags[, mode], callback)
*/

var fs = require("fs");

// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});



