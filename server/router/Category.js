const Category = require('../model/Category');
const router = require('koa-router')();

// 查
router.get('/',async (ctx)=>{
  const Categorylist = await Category.find();
  ctx.body=Categorylist
})

// 增加
router.post('/add',async (ctx)=>{
   const Categoryname = await Category.findOne({name:ctx.request.body.name})
    if(Categoryname){
      ctx.status = 422;
      ctx.body = '已经存在此分类';
      return 
    }else{
      const addname = await Category.create(ctx.request.body)
      if(addname){
        ctx.status = 200;
        ctx.body = '添加分类成功';
      }else{
        ctx.status = 423;
        ctx.body = '添加分类失败';
        return 
      }
    }
})

// 删除
router.delete('/remove/:id',async (ctx)=>{
  // 判断是否存在
 const Categorydelete = await Category.findByIdAndDelete({_id:ctx.url.split('/').pop()}) 
 if(Categorydelete){
  ctx.status = 200;
  ctx.body = '删除成功';
}else{
  ctx.status = 422;
  ctx.body = '删除失败';
  return
}
})

// 修改
router.put('/change/:id',async (ctx)=>{
  // 判断是否存在
   const Categorychange = await Category.findByIdAndUpdate({_id:ctx.request.body._id},{name:ctx.request.body.name})
   if(ctx.request.body.parent !=' '){
    await Category.updateMany({parent:ctx.request.body._id},{parentname:ctx.request.body.name})
   }else{
    console.log('不是一级栏目')
   }
   if(Categorychange){
    ctx.status = 200;
    ctx.body = '修改成功';
  }else{
    ctx.status = 422;
    ctx.body = '修改失败';
    return
  }
})

module.exports=router.routes()