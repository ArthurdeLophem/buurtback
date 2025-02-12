const createError = require('http-errors');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const burgersRouter = require('./routes/burgers');
const gemeentesRouter = require('./routes/gemeentes');
const projectsRouter = require('./routes/projects');
const creatiesRouter = require('./routes/creaties');
const buurtplanrRouter = require('./routes/buurtplanr');

dotenv.config();

const mongoLocal = "mongodb://localhost:27017/";
try {
  mongoose.connect(process.env.MONGO_DB || mongoLocal);
  console.log('MongoDB connected');
} catch (error) {
  console.log('MongoDB connection failed');
  handleError(process.env.MONGO_DB || mongoLocal, error);
}

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/burgers', burgersRouter);
app.use('/gemeentes', gemeentesRouter);
app.use('/projects', projectsRouter);
app.use('/creaties', creatiesRouter);
app.use('/buurtplanr', buurtplanrRouter);

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
