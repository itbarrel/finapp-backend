const getUsers = require('./getUsers')
const addUser = require('./addUser')
const updateUser = require('./updateUser')
const deleteUSer = require('./deleteUser')

module.exports = {
    '/v1/users': {
        get: getUsers,
        post: addUser,
    },
    '/v1/users/{id}': {
        put: updateUser,
        delete: deleteUSer,
    },

}
