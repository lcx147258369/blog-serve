const path = require('path')
const { argv } = require('yargs')

exports.APP = {
    LIMIT: 10,
    PORT: 8181,
    ROOT_PATH: __dirname,
    NAME: 'lcx',
    URL: '',
    FRONT_END_PATH: path.join(__dirname, '..', 'lcx')
}

exports.CROSS_DOMAIN = {
    allowedOrigins: [
        
    ],
    allowedReferer: 'lcx'
}

exports.CONFIG= {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
    port: 3306
}

exports.AUTH = {
    data: argv.auth_data || {user: 'root'},
    jwtTokenSecret: argv.auth_key || 'blog-node',
    defaultPassword: argv.auth_default_password || 'root'
}

exports.EMAIL = {
    account: argv.email_account || 'your email address like',
    password: argv.email_password || 'your email password'
}