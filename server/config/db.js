// 连接数据库
const mongoose = require('mongoose');
//  数据库地址链接
var url = "mongodb://localhost:27017/koa";
mongoose.set('useFindAndModify', false); 
mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true },(err)=>{
      if(err){
        console.log(err)
      }
      console.log('数据库连接成功')
});
// 把这个方法暴露出去
module.exports = mongoose