//创建数据库Category表模型
var mongoose=require('../config/db.js');
var Category = mongoose.Schema({
    // 账号
    name:{
      type:String,
      trim:true,//去空格
      required:true //必须传入
    },
    parent:{
      type:String,
      default:'1'//默认1
    },
    parentname:{
      type:String
    }
})

// 连接的表
// 第一个参数 首字母大写  要和数据库表名对应（user）
// 第二个参数 表结构要跟定义的一样（UserSchema）
// 第三个参数 表名 （user）
var Category=mongoose.model('Category',Category,'Category');

// 暴露User
module.exports=Category