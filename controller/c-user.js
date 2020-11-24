import { query } from '../mysql/mysql.js';

//注册用户
exports.insertUser = (value) => {
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