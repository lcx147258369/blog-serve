const register = require('../controller/c-register');

module.exports = app => {
    app.post('/register',register.postRegister);
}