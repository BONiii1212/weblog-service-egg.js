module.exports = options => {
    return async function adminauth(ctx,next){
        //中间件，路由跳转时，判断是否登录，登录了才给往下执行
        //需要设置session共享
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body = {data:'没有登录'}
        }
    }
}