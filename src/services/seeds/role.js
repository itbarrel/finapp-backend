const { RoleService } = require('../resources')

const superAdminRole = {
    name: 'Super Admin',
    value: 'super_admin',
    permissions: {
        Accounts: ['*'],
        Roles: ['*'],
        Users: ['*'],
        AccountTypes: ['*'],
        FormSubmissions: ['*'],
        Layouts: ['*'],

    },
    default: true,
}
const Role = new RoleService('public')

const create = async () => Role.create(superAdminRole)

const destroy = async () => Role.delete(superAdminRole)

module.exports = { create, destroy }
