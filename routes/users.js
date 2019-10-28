var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log(req.cookies);
  res.render('user',{userinfo:req.cookies.userinfo});
});

router.post('/loginAction', function (req, res, next) {
  let resoinseData = {};
  let username = req.body.username;
  let password = req.body.password;
  //console.log(req.body);
  if (username === '' || password === '') {
    resoinseData.code = 1;
    resoinseData.message = '用户名或密码不能为空!';
    res.json(resoinseData);
    return;
  }
  // 测试用户
  if (username === 'test' && password === '123456') {
    resoinseData.code = 200;
    resoinseData.message = '登录成功';
    resoinseData.userinfo = {
      _id: 'test',
      username: username
    };

    // req.cookies('userinfo', JSON.stringify(resoinseData.userinfo));
    // console.log(resoinseData.userinfo);
    res.cookie('userinfo',resoinseData.userinfo);
    res.json(resoinseData);

    //return;
  }
  // console.log(resoinseData.userinfo);
});

module.exports = router;
