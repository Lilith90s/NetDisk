var express = require('express');
var fs = require('fs');
var multer = require('multer');
var router = express.Router();
var request = require('request');
var db = require('./database.js');


// 设置上传路径
var uploadFolder = 'C:\\\\Users\\\\zhangjun\\\\Documents\\\\Files';
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
        let newname = file.originalname+ '-' + req.username;
        // db.insertFileInfo(fileinfo);
        //console.log(file);
        cb(null, newname);
    }
});
// 文件过滤
function fileFilter(req,file,cb){
    if (file.originalname === 'test1.txt') {
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
    // console.log(req.files);
    let date = new Date();
    for (let i = 0; i < req.files.length; i++) {
        let file = req.files[i];
        let fileinfo = {};
        // fileinfo['md5'] = '';
        fileinfo['username'] = req.cookies.userinfo.username;
        fileinfo['originalname'] = file.originalname;
        fileinfo['newfilename'] = file.originalname+ '-' + req.cookies.userinfo.username;
        fileinfo['location'] = uploadFolder;
        fileinfo['type'] = file.originalname.split('.').pop();
        fileinfo['size'] = file.size+'KB';
        fileinfo['uptime'] = date.toLocaleDateString();
        db.insertFileInfo(fileinfo);
    }
    res.send({res:'0'});
});

/* 下载文件 */
router.get('/download/*',function (req,res,next) {
    let filename = (req.url+'').split('/').pop();
    let f = uploadFolder+'\\';
    // 查询新文件名语句
    let sql = 'SELECT newfilename FROM fileinfo WHERE originalfilename = \'';
    sql += filename;
    sql += '\';';
    db.query(sql,function (ret) {
        // console.log(ret);
        res.download(f+ret,filename);
    });
    // console.log(newname);
});

module.exports = router;