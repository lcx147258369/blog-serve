const userModel = require('../mysql/mysql.js');
const md5 = require('md5');
const comment = require('moment');
const fs = require('fs');
const checkLogin = require('../middlewares/check.js').checkLogin;

/**
 * 登录校验
 */
exports.getLoginState = async ctx => {
    await checkLogin(ctx)
}
/**
 * 查询用户是否已经注册，未注册则提交注册申请
 */
exports.postRegister = async (req, res) => {
    let {name, password, repeatpass} = req.body
    await userModel.findUserNameCount(name)
        .then(async (result) => {
            
            if(result[0].count >=1) {
                res.body = {
                    code: 500,
                    message: '用户存在'
                }
            } else if(password !== repeatpass) {
                res.body = {
                    code: 500,
                    message: '两次输入的密码不一致'
                }
            } else {

                await userModel.insertUser([name, md5(password)])
                        .then(response => {
                            console.log('注册成功')
                            res.body = {
                                code: 200,
                                message: '注册成功'
                            }
                        })
                        .catch(err => {
                            console.log('注册失败')
                            res.body = {
                                code: 500,
                                message: '服务器错误'
                            }
                        })
            }
        })
}