var express = require('express');
var router = express.Router();
var URL = require('url'); //引入URL中间件
var User = require('./model'); //引入数据模型
// GET users listing
router.get('/', function(req, res, next) { //监听'/users'
    res.send('respond with a resource');
});
router.get('/getUserInfo', function(req, res, next) {
    var user = new User(); //实例化对象
    var params = URL.parse(req.url, true).query;//获取url参数
    console.log('params', params);
    if (params.id == '1') { //根据参数赋值
        user.name = "luo";
        user.age = "11";
        user.city = "北京市";
    } else {
        user.name = "lion";
        user.age = "22";
        user.city = "杭州市";
    }
    var response = { status: 200, data: user }; //定义返回数据
    res.send(JSON.stringify(response)); //发送请求
});
module.exports = router;
