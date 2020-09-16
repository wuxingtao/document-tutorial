/*
1.文件上传有以下方法

muilter.single(‘file’), //适用于单文件上传
muilter.array(‘file’,num), //适用于多文件上传，num为最多上传个数，上传文件的数量可以小于num,
muilter.fields(fields), //适用于混合上传，比如A类文件1个，B类文件2个。官方API有详细说明。
2.file为上传字段名称，当使用form表单submit方式上传时，必须与表单上传的name属性保持一致。
表单记得加上  enctype=‘multipart/form-data’

3.对上传文件大小限制，名称限制等均可在limits中加上，具体可加属性，请参考官方api。
 */

var express = require('express')

var path = require('path');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/'});


var app = express()

//view engine setup
app.set('view engine','jade')
app.set('views', path.join(__dirname, 'views'));


//
app.get("/",function(req,res){
    res.render("upindex")
});

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  var file = req.file
  console.log(file);
  res.send(file);
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  var file = req.files
  console.log(file);
  res.send(file);
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})

//
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})