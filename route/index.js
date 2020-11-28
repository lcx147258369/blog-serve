const { register, login, logOut } = require('./user');

module.exports = app => {
    app.post('/user/register', register);
    app.post('/user/login', login);
    app.post('/user/logOut', logOut);
}