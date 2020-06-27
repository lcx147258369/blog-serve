/**
 * 登录
 */

 const userModel = require('../mysql/mysql.js')
 const md5 = require('md5')
 const checkNotLogin = require('../middlewares/check.js').checkNotLogin
 const checkLogin = require('../middlewares/check.js').checkLogin

 // 获取签名信息
 exports.getSignin = async ctx => {
    await ctx.render('login', {
      session: ctx.session
    })
 }

 exports.postSignin = async ctx => {
   let { name, password } = ctx.request.body;
   await userModel.findUserByName(name)
   .then(result => {
      let res = result;
      if(res.length && name === res[0]['name'] && mad5(password) === res[0]['pass']) {
          ctx.session = {
            user: res[0]['name'],
            id: res[0]['id']
          }
          ctx.body = {
            code: 200,
            message: '登录成功'
          }
      } else {
          ctx.body = {
            code: 500,
            message: '用户名或密码错误'
          }
      }
   })
   .catch(err => {
     console.log(err)
   })
 }

 
