/*静态文件
Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。
你可以使用 express.static 中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下 
app.use(express.static('public'));*/

var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/',function(req,res){
  res.send('Hello World')
})

var server = app.listen(8081,function(){
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})