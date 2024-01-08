var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var channelRouter = require('./routes/channel.js');
var articleRouter = require('./routes/article');
var channelAPIRouter = require('./routes/channelAPI');
var memberAPIRouter = require('./routes/memberAPI');

const connect = require('./schemas/index.js');
connect();

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 페이지 레이아웃
app.set('Layout', 'Layout');
app.set("Layout extractScripts", true); 
app.set("Layout extractStyles", true); 
app.set("Layout extractMetas", true); 
app.use(expressLayouts);

// 로그인, 회원가입 레이아웃
app.set('authLayout', 'authLayout');
app.set("authLayout extractScripts", true); 
app.set("authLayout extractStyles", true); 
app.set("authLayout extractMetas", true); 
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/channel', channelRouter);
app.use('/article', articleRouter);
app.use('/api/channel', channelAPIRouter);
app.use('/api/member', memberAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
