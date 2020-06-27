module.exports = {
    // 校验是否登录，已经登录了，定向到文章页
    checkNotLogin: (ctx) => {
        if(ctx.session && ctx.session.user) {
            ctx.redirect('/posts');
            return false;
        }
        return true;
    },
    // 没有登录的情况，定向到登录
    checkLogin: (ctx) => {
        if (!ctx.session || !ctx.session.user) {
            ctx.redirect('/login');
            return false;
        }
        return true;
    }
}