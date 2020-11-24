/**
 * 数据库连接
 */
const mysql = require('mysql2')
const { CONFIG } = require('../app.config.js')

// 数据库链接
var pool = mysql.createPool({
    host: CONFIG.host,
    user: CONFIG.user,
    password: CONFIG.password,
    database: CONFIG.database,
    port: CONFIG.port
})

// console.log()

/**
 * 查询方法
 * @param {*} sql 
 * @param {*} values 
 */
export const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

// 创建用户表
let users = 
    `create table if not exists users(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL COMMENT '用户名',
        pass VARCHAR(100) NOT NULL COMMENT '密码',
        avatar VARCHAR(100) NOT NULL DEFAULT 'http://pic4.zhimg.com/50/v2-863f6b3e7f1df641afc798eb56b60fc6_hd.jpg' COMMENT '头像',
        moment VARCHAR(100) NOT NULL COMMENT '注册时间',
        PRIMARY KEY(id)
    );`

// 文章表
let posts = 
    `create table if not exists posts(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL COMMENT '文章作者',
        title TEXT(0) NOT NULL COMMENT '评论标题',
        content TEXT(0) NOT NULL COMMENT '评论题目',
        uid VARCHAR(40) NOT NULL COMMENT '用户id',
        moment VARCHAR(100) NOT NULL COMMENT '发表时间',
        comments VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '文章数评论',
        md TEXT(0) NOT NULL COMMENT 'markdown',
        pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
        avatar VARCHAR(100) NOT NULL COMMENT '用户头像',
        PRIMARY KEY(id)
    );`


// 评论表
let comment = 
    `create table if not exists comment(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL COMMENT '用户名称',
        content TEXT(0) NOT NULL COMMENT '评论内容',
        moment VARCHAR(40) NOT NULL COMMENT '评论时间',
        postid VARCHAR(40) NOT NULL COMMENT '文章id',
        avatar VARCHAR(100) NOT NULL COMMENT '用户头像',
        PRIMARY KEY(id)
    );`

// 表创建方法
let createTable = (sql) => {
    return query(sql, [])
}
// 开始建表
createTable(users)
createTable(posts)
createTable(comment)


