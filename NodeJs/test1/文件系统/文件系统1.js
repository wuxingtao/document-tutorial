/*读取文件
以下为异步模式下读取文件的语法格式：
 */
//fs.read(fd, buffer, offset, length, position, callback)

var fs = require("fs");
var buf = new Buffer(1024);

console.log("准备打开已存在的文件！");
fs.open('E:\\MySoftware\\baidu\\百度云同步盘\\WEB素材整理\\【exe】xtTest\\jsTest\\nodeJs\\input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("准备读取文件：");
   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + "  字节被读取");
      
      // 仅输出读取的字节
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
   });
});



/*截取文件
异步模式下截取文件的语法格式：
fs.ftruncate(fd, len, callback)
 */
console.log("\n")
var fs = require("fs");
var buf = new Buffer(1024);

console.log("ftruncate截取准备打开文件！");
fs.open('E:\\MySoftware\\baidu\\百度云同步盘\\WEB素材整理\\【exe】xtTest\\jsTest\\nodeJs\\input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
   console.log("文件打开成功！");
   console.log("截取10字节后的文件内容。");
   
   // 截取文件
   fs.ftruncate(fd, 5, function(err){
      if (err){
         console.log(err);
      } 
      console.log("文件截取成功。");
      console.log("读取相同的文件"); 
      fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
         if (err){
            console.log(err);
         }

         // 仅输出读取的字节
         if(bytes > 0){
            console.log("输出："+buf.slice(0, bytes).toString());
         }

         // 关闭文件
         fs.close(fd, function(err){
            if (err){
               console.log(err);
            } 
            console.log("文件关闭成功！");
         });
      });
   });
});



//读取目录
//fs.readdir(path, callback)
fs.readdir("/tmp/",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       console.log( file );
   });
});

//删除目录
//fs.rmdir(path,callback)