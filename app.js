const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const userModel = require('./mysql/mysql.js')
const route = require('./route/index.js')
// import 等语法要用到 babel 支持
require('babel-register')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser('blog_node_cookie'))

app.use(
    session({
        secret: 'blog_node_cookie',
        name: 'session_id',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 1000 * 30, httpOnly: true }
    })
)

app.use(function (req, res, next) {
    res.locals.userInfo = req.session.userInfo;
    var err = req.session.error;
    res.locals.message = '';
　　if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
})

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
})



route(app);


// 404的处理
app.use(function(req, res, next) {
    next(createError(404))
})

// 错误处理
app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err: {}
    res.status(err.status || 500)
    res.render('error')
})



module.exports = app