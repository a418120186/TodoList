var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //引入对象
var TodoModel = mongoose.model('Todo');
//由于该Model在db.js已经发布，则可以直接通过名字索引到。如果没有发布，代码将会异常
router.get('/', function(req, res, next) {
    // 查询数据库获取所有待办事项.
    TodoModel.
    find().
    sort('updated_at').
    exec(function(err, todos, count) {
        res.render('index', { //渲染页面
            title: 'Todo List',
            todos: todos
        });
    });
});
router.post('/create', function(req, res) {
    console.log('req.body', req.body);
    new TodoModel({ //实例化对象，新建数据
        content: req.body.content,
        updated_at: Date.now()
    }).save(function(err, todo, count) { //保存数据
        console.log('内容', todo, '数量', count); //打印保存的数据
        res.redirect('/'); //返回首页
    });
});
//需要传入参数id
router.get('/destroy/:id', function(req, res) {
    //根据待办事项的id 来删除它
    TodoModel.findById(req.params.id, function(err, todo) {
        todo.remove(function(err, todo) {
            res.redirect('/');
        });
    });
});
//跳转到编辑页面
router.get('/edit/:id', function(req, res) {
    TodoModel.
    find().
    sort('updated_at').
    exec(function(err, todos, count) {
        res.render('edit', { //重新渲染页面
            title: 'Todo List',
            todos: todos,
            current: req.params.id
        });
    });
});
//根据传入的数据id,更改数据
router.post('/update/:id', function(req, res) {
    TodoModel.findById(req.params.id, function(err, todo) {
        todo.content = req.body.content;
        todo.updated_at = Date.now();
        todo.save(function(err, todo, count) {
            res.redirect('/');
        });
    });
});
module.exports = router;
