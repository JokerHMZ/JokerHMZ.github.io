/**
 * Created by he.mingze on 2017/9/22.
 */
var indexController={
    index(){
        return async (ctx,next)=>{
            ctx.body=await ctx.render('index.html',{
                title:'koa2'
            })
        }
    },
    update(){
        return async (ctx,next)=>{
            var indexM=new indexModel(ctx);
            ctx.body=await inexM.updateNum()
        }
    }
};

export default indexController