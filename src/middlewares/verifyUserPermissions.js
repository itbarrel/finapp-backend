const storage = require('../utils/cl-storage')

const { UserService } = require('../services/resources')

const verifyUserPermissions = async (req, res, next) => {
    storage.run(async () => {
        try {
            const decoded = storage.get('decoded')
            const domain = storage.get('domain')

            const User = new UserService(domain)

            const user = await User.findByQuery({ id: decoded.id })
            if (user) {
                const role = await user.getRole()
                storage.set('user', user)
                storage.set('role', role)
                next()
            } else {
                throw Error('Invalid User Token')
            }
        } catch (error) {
            next(error)
        }
    })
}

module.exports = verifyUserPermissions
