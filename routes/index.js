var express = require('express');
var router = express.Router();
var db = require('./database.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log({title: 'Express',test:{test1:'test2',test3:'test4'}});
  db.getFileList(req.cookies.userinfo.username,function (result) {

    res.render('index',{fileinfos:result});
  });
});



module.exports = router;
