const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require("connect-flash");
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const passport = require("passport");
const session = require("express-session");
const mongoose = require('mongoose');

const setUpPassport = require("./routes/admin/setuppassport");

/*

 // compress responses
 app.use(compression())

 // server-sent event stream
 app.get('/events', function (req, res) {
 res.setHeader('Content-Type', 'text/event-stream')
 res.setHeader('Cache-Control', 'no-cache')

 // send a ping approx every 2 seconds
 var timer = setInterval(function () {
 res.write('data: ping\n\n')

 // !!! this is the important part
 res.flush()
 }, 2000)

 res.on('close', function () {
 clearInterval(timer)
 })
 })


 */

const index = require('./routes/index');
const admin = require('./routes/admin/index');
const category = require('./routes/admin/category/index');
const currency = require('./routes/admin/currency/index');

const app = express();
try {
  mongoose.connect('mongodb://mongodb_dev:27017/shroff-development');
} catch (e) {
  console.log('No Database!', e);
}

setUpPassport();

app.use(helmet());
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
  secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/admin', admin);
app.use('/admin/category', category);
app.use('/admin/currency', currency);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
