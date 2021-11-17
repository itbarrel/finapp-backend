const getRoles = require('./getRoles')
const addRole = require('./addRole')
const updateRole = require('./updateRole')
const deleteRole = require('./deleteRole')

module.exports = {
    '/v1/roles': {
        get: getRoles,
        post: addRole,
    },
    '/v1/roles/{id}': {
        put: updateRole,
        delete: deleteRole,
    },

}
