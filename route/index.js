const { register, login } = require('./user');

module.exports = app => {
    app.post('/user/register', register);
    app.post('/user/login', login);
}