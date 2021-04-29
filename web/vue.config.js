module.exports = {
  lintOnSave: false,
    // 解决跨域问题  重启项目
    // devServer:{
    //   proxy:{
    //     '/api':{
    //         target:'http://192.168.14.168:3000',//目标网址 比如''
    //         changeOringin:true
    //         }
    //       }
    //   },
    // 使用mock模拟数据
    devServer:{
      before:require('./mock/index.js')
    }


}

