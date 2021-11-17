const getAccounts = require('./getAccounts')
const postAccounts = require('./addAccount')

module.exports = {
    '/v1/accounts': {
        get: getAccounts,
        post: postAccounts,
    },
}
