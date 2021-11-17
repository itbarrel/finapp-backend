const login = require('./login')
const forgetpassword = require('./forgetpassword')
const resetPassword = require('./resetpassword')
const me = require('./me')
const changepassword = require('./changepassword')

module.exports = {
    '/v1/auth/login': {
        post: login,
    },
    '/v1/auth/forgetpassword': {
        post: forgetpassword,
    },
    '/v1/auth/resetpassword': {
        post: resetPassword,
    },
    '/v1/auth/me': {
        post: me,
    },
    '/v1/auth/changepassword': {
        post: changepassword,
    },
}
