const koa = require('koa');
const app = new koa();
require('./config/db.js')// 连接数据库
const router = require('koa-router')()//引入路由

const bodyParser = require('koa-bodyparser');
app.use(bodyParser())


//跨域
const cors = require('koa2-cors');
app.use(cors({
  // 解决跨域session获取不到值的问题
  credentials: true
}))


router.get('/',async (ctx)=>{
	ctx.body="首页"
})
router.get('/news',async (ctx)=>{
	ctx.body="这是新闻页面"
})
router.get('/product',async (ctx) => {
	ctx.body="这是产品页面"
})


// 引入路由
const Category=require('./router/Category')
// 路由设置
router.use('/api/v1/Category',Category);
// router.use(index);//默认是index路由模板


//启动路由
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000)