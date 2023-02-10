require('dotenv').config()
require('./config/database')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
var app = express();


//my Routes
const subs = require('./routes/subsRoutes');
const contact = require('./routes/contactRoutes');
const usersApp = require('./routes/usersAppRoutes')
const postUsersRouter = require('./routes/postUsersRoutes')
const recipes = require('./routes/recipesRoutes')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())

app.use(logger('dev'));


// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', express.static(`${__dirname}/storage/assets`))

app.use(cookieParser());



app.use('/', indexRouter);
app.use('/users', usersRouter);

//myRoutes
app.use('/newsletter', subs);
app.use('/form', contact);
app.use('/usersapp', usersApp);
app.use('/wall', postUsersRouter);
app.use('/recipes', recipes);

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
