/*
//multer 中间件数据存储引擎 storage (DiskStorage 和 MemoryStorage)

//1   DiskStorage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

//2   MemoryStorage
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

 */

var express = require('express')

var path = require('path');
var multer  = require('multer');
//设置上传后文件路径，uploads文件夹会自动创建。
var storage = multer.diskStorage({
  destination:function(req,file,cb){
    // cb(null,'./uploads/images' + file.originalname)
    cb(null,'./uploads/images')
  },
    //给上传文件重命名，获取添加后缀名
  filename:function(req,file,cb){
    var fileFormat = (file.originalname).split(".");
    cb(null,file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length-1])
  }
})
var upload =multer({storage:storage,limits:{}})


var app = express()

//view engine setup
app.set('view engine','jade')
app.set('views', path.join(__dirname, 'views'));


//
app.get("/",function(req,res){
    res.render("upindex")
});

//app.post('/profile', upload.single('avatar'), function (req, res, next) {
//  // req.file is the `avatar` file
//  // req.body will hold the text fields, if there were any
//  var file = req.file
//  console.log(file);
//  res.send(file);
//})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any

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

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})