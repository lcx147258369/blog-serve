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

/**
 * 查询方法
 * @param {*} sql 
 * @param {*} values 
 */
let query = (sql, values) => {
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
        avator VARCHAR(100) NOT NULL COMMENT '头像',
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
        avator VARCHAR(100) NOT NULL COMMENT '用户头像',
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
        avator VARCHAR(100) NOT NULL COMMENT '用户头像',
        PRIMARY KEY(id)
    );`

// 表创建方法
let createTable = (sql) => {
    return query(sql, [])
}

console.log('创建表')
// 开始建表
createTable(users)
createTable(posts)
createTable(comment)

//注册用户
exports.insertUser = (value) => {
    console.log(value)
    let _sql = `insert into users set name=?,pass=?;`
    return query(_sql, value)
}

// 通过名字查找用户
exports.findUserByName = (name) => {
    let _sql = `select * from users where name="${name}";`
    return query(_sql)
}

// 通过名字查找用户数量判断用户是否已经存在
exports.findUserNameCount = (name) => {
    let _sql = `select count(*) as count from users where name="${name}";`
    return query(_sql)
}

