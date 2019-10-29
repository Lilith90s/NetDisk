var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log({title: 'Express',test:{test1:'test2',test3:'test4'}});
  res.render('index',{} );
});



module.exports = router;
