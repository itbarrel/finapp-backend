module.exports = {}

// const AccountSeeder = require('./account')
const AccountTypeSeeder = require('./accoutType')
const RoleSeeder = require('./role')
const UserSeeder = require('./user')

const create = async () => {
    // await AccountSeeder.create()
    await AccountTypeSeeder.create()
    await RoleSeeder.create()
    await UserSeeder.create()
}

const destroy = async () => {
    // await AccountSeeder.destroy()
    await AccountTypeSeeder.create()
    await RoleSeeder.destroy()
    await UserSeeder.destroy()
}

module.exports = { create, destroy }
