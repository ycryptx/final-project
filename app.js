var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
require('dotenv').config();


var indexRouter = require('./routes/mainRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if(process.env.NODE_ENV === 'development') {
    // configure webpack-dev-middlware with our original webpack config
    // then... "use" webpack-dev-middleware

    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackConfig = require('./webpack.config.js')
    const webpack = require("webpack");
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        publicPath:'/javascripts'
    }));
}
app.use(express.static(path.join(__dirname, 'build')));
app.use(expressValidator())

app.use('/', indexRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send("Error handling your request");
  // next(createError(404));
});

module.exports = app;
