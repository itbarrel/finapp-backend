const { RoleService, UserService } = require('../resources')

const create = async () => {
    const User = new UserService('public')
    const Role = new RoleService('public')
    const role = await Role.findByQuery({ value: 'super_admin' })

    const superAdmin = {
        userName: 'SuperAdmin',
        email: 'superadmin@finapp.com',
        password: 'finapp12345',
        firstName: 'Super',
        lastName: 'Admin',
        RoleId: role.id,
    }

    await User.create(superAdmin)
}

const destroy = async () => UserService.delete({})

module.exports = { create, destroy }
