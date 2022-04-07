// const whiteList = ['/admin/index','/admin/checkLogin']
module.exports=options=>{
    return async function(ctx,next){
        let token = ctx.request.header.authorization //拿到token
        // if(!whiteList.some(item=>item==url)){ //如果不在白名单中
        //     let token = ctx.request.header.authorization //拿到token
        // }
        if(token){
            try{
                let decode = ctx.app.jwt.verify(token.slice(7),ctx.app.config.jwt.secret) 
                await next()
            }catch(error){
                ctx.status = 401;
                ctx.body={
                    message:error.message
                };
                return
            }
            
        }else{
            ctx.status = 401;
            ctx.body = {
                message:'没有token'
            }
            return
        }
    }
}