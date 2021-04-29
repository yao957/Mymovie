const fs = require('fs')
const path = require('path')
const Mock = require('mockjs') //导入mockjs模块
const JSON5 = require("json5")

// 创建一个读取文件的方法 getJsonFile()
function getJsonFile(filePath){
  var json = fs.readFileSync(path.resolve(__dirname,filePath),'utf-8')
  return JSON5.parse(json)
}

module.exports = function(app){
  if(process.env.MOCK == 'true'){
    // 获取城市数据
    app.get('/getcity',(req,res)=>{
        var json =getJsonFile('./city.json5')
        res.json(Mock.mock(json))
    }),
    // 获取热映 数据
    app.get('/NowPlay',(req,res)=>{
      var json =getJsonFile('./NowPlaying.json5')
      res.json(Mock.mock(json))
   }),

    // 获取即将上映
    app.get('/comsoon',(req,res)=>{
    var json =getJsonFile('./ComSoon.json5')
    res.json(Mock.mock(json))
   }),

    // 搜索 
    app.get('/search/:con',(req,res)=>{
      var json =getJsonFile('./NowPlaying.json5')
      var zi =  req.params.con;
      let sdata =Mock.mock(json)
      //验证是否是中文 中文返回的数组是名称的数组
      var pattern = new RegExp("[\u4E00-\u9FA5]+");
      //验证是否是英文 英文返回的是拼音的数组
      var pattern2 = new RegExp("[A-Za-z]+");
      if(pattern.test(zi)){
        // 定义一个空数组 存储筛选指定拼音的数组
        // console.log(`长度`+sdata.Movelist.length);
        let rmlist = [];
        // 循环数组把 ishot等于一的就加入到 hotlist数组中
        for(var i=0;i<sdata.Movelist.length;i++){
            if(sdata.Movelist[i].rm){
              rmlist.push(sdata.Movelist[i] );
            }
        }
        let pylist=[];
        // 根据输入的值判断 数组中是否有 输入的值  indexOf 不存在返回-1
        for(var j=0;j<rmlist.length;j++){
          if(rmlist[j].rm.indexOf(zi)!=-1){
              pylist.push(rmlist[j] );
          }
        }
        // console.log(pylist);
        res.json(pylist)
      }else if(pattern2.test(zi)){
        let rmlist = [];
        for(var i=0;i<sdata.Movelist.length;i++){
            if(sdata.Movelist[i].pingyin){
              rmlist.push(sdata.Movelist[i] );
            }
        }
        let pylist=[];
        for(var j=0;j<rmlist.length;j++){
          if(rmlist[j].pingyin.indexOf(zi)!=-1){
              pylist.push(rmlist[j] );
          }
        }
        res.json(pylist)
      }
    }),

    // 电影院数据
    app.get('/Cinma',(req,res)=>{
      var json =getJsonFile('./Cinma.json5')
      res.json(Mock.mock(json))
     })



  }
}