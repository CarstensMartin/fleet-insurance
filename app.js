var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const helmet = require("helmet");

// Body Parser Setup
const bodyParser = require('body-parser');


// Modules - Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var allCarsRouter = require('./routes/allCars');
var carsRouter = require('./routes/cars');
var insuranceRouter = require('./routes/insurance');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Setup Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/allcars', allCarsRouter);
app.use('/cars', carsRouter);
app.use('/insurance', insuranceRouter);


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
