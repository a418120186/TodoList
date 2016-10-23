require('./db');

// 引入对象
var express = require('express');
var path = require('path'); //path对象，规范连接和解析路径
var favicon = require('serve-favicon'); //页面图标
var logger = require('morgan'); //http请求日志记录器
var cookieParser = require('cookie-parser'); //解析cookie
var bodyParser = require('body-parser'); //处理请求body的中间件
var engine = require('ejs-mate');
var moment = require('moment');

var app = express();
var routes = require('./routes/index'); //home page接口
var users = require('./routes/users'); //用户接口

///======= view engine setup  模板 开始===========//
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);
///======= view engine setup  模板 结束===========//

///======= 使用中间件 开始===========//
// uncomment after placing your favicon in /public (需要显示favicon时，取消注释)
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev')); //以开发者模式，使用log
app.use(bodyParser.urlencoded({ extended: false })); //解析 application/x-www-form-urlencoded类型
app.use(bodyParser.json()); //解析 application/json类型
app.use(cookieParser()); //cookie中间件
app.use(express.static(path.join(__dirname, 'public'))); //静态文件夹方法
///======= 使用中间件 结束===========//


///=======路由信息 （接口地址）开始 ===========//
//存放在./routes目录下
app.use('/', routes); //在app中注册routes该接口 
app.use('/users', users); //在app中注册users接口
///=======路由信息 （接口地址) 介绍===========//


//时间数据格式化，引入moment
app.locals.myDateFormat = function(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
};



// catch 404 and forward to error handler(捕获404错误，并转向错误处理程序)
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
///======= error handlers  错误处理程序  开始========//

// development error handler(开发者错误处理程序)
// will print stacktrace(将会打印堆栈跟踪)
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500); //返回错误状态码
        res.render('error', { //渲染error视图模板
            message: err.message,
            error: err
        });
    });
}
// production error handler(生产环境下的处理程序)
// no stacktraces leaked to user(不会泄露堆栈跟踪给用户)
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
///======= error handlers  错误处理程序  结束========//
module.exports = app;
