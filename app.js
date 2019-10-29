var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Cookies=require('cookies');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filesRouter = require('./routes/files');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//登录拦截器，必须放在静态资源声明之后、路由导航之前
app.use(function (req, res, next) {
  var url = req.originalUrl;
  const filterlist = ["/users","/users/loginAction"];
  if (!filterlist.includes(url) && !req.cookies.userinfo) {
    return res.redirect("/users");
  }
  next();
});




// app.all('*',usersRouter.requireAuthentication);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/files',filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
module.exports = app;
