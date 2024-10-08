var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const database = require('./config/db');
const cors=require('cors');
const dotenv= require('dotenv');
dotenv.config()


var authRouter = require('./routes/authRoutes');
var usersRouter = require('./routes/usersRoutes');
var adminRouter = require('./routes/adminRoutes');
var paymentRouter=require('./routes/paymentRoutes');
var ownerRouter=require('./routes/ownerRoutes');
database()
var app = express();

app.use(cors({
  origin: 'https://taptickets-fe.onrender.com'
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/payments', paymentRouter);
app.use('/owners', ownerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
