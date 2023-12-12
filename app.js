var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles');
var memberRouter = require('./routes/member');
var channelRouter = require('./routes/channel');
var messageRouter = require('./routes/message');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/views/src/assets'));

app.use('/', indexRouter);
app.use('/articles', articlesRouter);
app.use('/member', memberRouter);
app.use('/channel', channelRouter);
app.use('/message', messageRouter);
app.use('/admin', adminRouter);

app.use(session({
  secret: 'lee',  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }  
}));

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
