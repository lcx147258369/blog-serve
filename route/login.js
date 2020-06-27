/**
 * 权限和用户数据模型
 */

const crypto = require('crypto');
const { argv } = require('yargs');
const { sequelize } = require('../mysql/mysql.js')

const admin = sequelize.define('user',{
    
})