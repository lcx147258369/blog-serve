const userModel = require('../controller/c-user.js');
const md5 = require('md5');
const comment = require('moment');
const fs = require('fs');
const checkLogin = require('../middlewares/check.js').checkLogin;
import { setToken } from '../util/util.js';

/**
 * 登录校验
 */
exports.getLoginState = async ctx => {
    await checkLogin(ctx)
}
/**
 * 查询用户是否已经注册，未注册则提交注册申请
 */
exports.register = async (req, res) => {
    let {name, password} = req.body;
    await userModel.findUserNameCount(name)
        .then(async (result) => {
            if(result[0].count >=1) {
                res.body = {
                    code: 500,
                    message: '用户存在'
                }
            } else {
                await userModel.insertUser([name, md5(password)])
                        .then(response => {
                            userModel.findUserByName(name)
                            .then(user => {
                                setToken(name).then(token => {
                                    res.body = {
                                        code: 200,
                                        data: {
                                            token: token,
                                            user_info: user[0]
                                        },
                                        message: '注册成功'
                                    }
              
                                })
                            })
                            .catch(err => {
                                res.body = {
                                    code: 500,
                                    message: '获取用户信息失败！'
                                }
                            })
                            
                        })
                        .catch(err => {
                            res.body = {
                                code: 500,
                                message: '服务器错误'
                            }
                        })
                
            }
            res.send(res.body);
        })
}


exports.login = async (req, res) => {
   let { name, password } = req.body;
   await userModel.findUserByName(name)
   .then(result => {
      if(result.length && name === result[0]['name'] && md5(password) === result[0]['pass']) {
          setToken(name).then(token => {
              res.body = {
                code: 200,
                message: '登录成功',
                data: {
                    token: token
                }
              }
          })
          
      } else {
          res.body = {
            code: 500,
            message: '用户名或密码错误'
          }
      }
   })
   .catch(err => {
     console.log(err)
   })
   res.send(res.body);
 }