var mongoose = require("mongoose"); //引入mongoose

///===    监听  开始   ===//
var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});
///===    监听  结束   ===//


///===    Schema、model  开始   ===//

var TodoSchema = new mongoose.Schema({
    user_id: String, //定义一个属性user_id，类型为String
    content: String, //定义一个属性content，类型为String
    updated_at: Date //定义一个属性updated_at，类型为Date
});

mongoose.model('Todo', TodoSchema); //将该Schema发布为Model

///===    Schema、model  结束   ===//


mongoose.connect('mongodb://localhost/todo'); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017  
module.exports = mongoose;

