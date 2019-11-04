var express = require('express');
var fs = require('fs');
var multer = require('multer');
var router = express.Router();
var request = require('request');

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
        // console.log(file);
        cb(null, file.originalname+ '-' + Date.now());

    }
});
// 文件过滤
function fileFilter(req,file,cb){
    if (file.originalname === 'test.txt') {
        cb(null,false);
    }
    else{
        cb(null,true);
    }
    //cb(new Error('文件重复'));
};

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage,fileFilter:fileFilter });

/* 上传文件 */
router.post('/upload',upload.array('file',20),function (req,res,next) {
    res.send({res:'0'});
});

/* 下载文件 */
router.get('/download/*',function (req,res,next) {
    // let f = 'C:\\Users\\zhangjun\\Documents\\Files\\test.txt';
    let filename = (req.url+'').split('/').pop();
    let f = uploadFolder+'\\'+filename;
    //console.log( );
    //f = path.resolve(f);
    //console.log('Download file: %s',f);
    let newfilename = '';
    res.download(f,'file');
});


module.exports = router;