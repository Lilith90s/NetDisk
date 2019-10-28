var express = require('express');
var fs = require('fs');
var multer = require('multer');
var router = express.Router();

// 设置上传路径
var uploadFolder = 'C:\\Users\\zhangjun\\Documents\\Files';
var createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};
createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.fieldname + '-' + Date.now());
  }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage });


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log({title: 'Express',test:{test1:'test2',test3:'test4'}});
  res.render('index',{} );
});

/* 上传文件 */
router.post('/upload',upload.array('file',20),function (req,res,next) {
  console.log(req.files);
  res.send({res:'0'});
});

module.exports = router;
