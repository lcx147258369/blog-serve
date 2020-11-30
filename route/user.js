const userModel = require('../controller/c-user.js');
const md5 = require('md5');
const comment = require('moment');
const fs = require('fs');
const checkLogin = require('../middlewares/check.js').checkLogin;
import { clearCache } from 'ejs';
import { response } from 'express';
import { DATE } from 'mysql2/lib/constants/types';
import { setToken,  responseClient } from '../util/util.js';


/**
 * 登录校验
 */
exports.getLoginState = async ctx => {
    await checkLogin(ctx)
}

/**
 * 注册
 */
exports.register = async (req, res) => {
    try {
        await findUserNameCount(res, req);
    }
    catch(err) {
        res.send({
            code: 0,
            msg: '接口错误',
            data: null
        })
    }
}

/**
 * 查找用户信息
 * @param {*} name 
 * @param {*} res 
 */
async function findUserByName (res, req, msg) {
    try {
        let { name, password } = req.body;
        const user = await userModel.findUserByName(name);
        userSetToken(res, req, user, msg);
    }
    catch(err) {
        res.send({
            code: 0,
            msg: '用户信息获取失败！',
            data: null
        })
    }
}


/**
 * 插入用户信息
 * @param {*} name 
 * @param {*} password 
 * @param {*} res 
 */
async function insertUser (name, password, res, req ,avator='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2915303998,630000401&fm=26&gp=0.jpg', moment= new Date().getTime()) {
    try {
        let response = await userModel.insertUser([name, md5(password), avator, moment]);
       
        findUserByName(res, req, '注册');
    }
    catch(err) {
        console.log(err);
        res.send({
            code: 0,
            msg: '用户信息写入失败!',
            data: null
        })
    }
}


/**
 * 写入密码返回token
 * @param {*} name 
 * @param {*} res 
 */
 async function userSetToken(res, req, user, msg) {
     try {
        let { name } = req.body;
        let token = await setToken(name);
        req.session.userInfo = user[0];
        res.send({
            code: 1,
            msg:  msg + '成功',
            data: {
                token,
                ...user[0]
            }
        });
     }
     catch(err) {
         res.send({
             code: 0,
             msg:  msg + '失败',
             data: null
         });
     }
 }


/**
 * 查找账号是否存在
 * @param {*} name 
 * @param {*} password 
 * @param {*} res 
 */
async function findUserNameCount (res, req) {
    try {
        let {name, password} = req.body;
        let result = await userModel.findUserNameCount(name);
        if(result[0].count >=1) {
             res.send(
                {
                    code: 0,
                    msg: '用户已存在',
                    data: null
                }
             );
        } else {
            insertUser(name, password, res, req);
        }
    }
    catch(err){
        res.send(
            {
                code: 0,
                msg: '用户信息查询失败',
                data: null
            }
         );
    }
}







/**
 * 登录
 * @param {*} req 
 * @param {*} res 
 */
exports.login = async (req, res) => {
    try {
        await findUserByName(res, req, '登录');
    }
    catch(err) {
        res.send({
            code: 0,
            msg: '登录失败',
            data: null
        });
    }
   
 };

 /**
  * 退出登录
  * @param {*} req 
  * @param {*} res 
  */
 exports.logOut = async (req, res) => {
     console.log(req.locals)
     try {
         console.log(req.session);
        if(req.session.userInfo) {
            req.session.userInfo = null;
        } 
        res.send({
            code: 1,
            msg: '退出成功',
            data: null
        })
     }
     catch(err) {
        res.send({
            code: 0,
            msg: '服务器错误!',
            data: null
        })
     }
 }

