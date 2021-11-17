const account = require('./accounts')
const auth = require('./auth')
const user = require('./users')
const role = require('./roles')

module.exports = {
    ...auth,
    ...account,
    ...role,
    ...user,

}
