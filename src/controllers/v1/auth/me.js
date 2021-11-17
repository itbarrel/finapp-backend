const jwt = require('jsonwebtoken')
const { UserService } = require('../../../services/resources')

const config = require('../../../../config')
const storage = require('../../../utils/cl-storage')

const me = async (req, res, next) => {
    try {
        const decoded = storage.get('decoded')

        const User = new UserService()

        if (decoded && decoded.userName && decoded.domain) {
            const user = await User.findByQuery({ email: decoded.email }, true)
            const role = await user.getRole()

            const tokenObj = {
                id: user.id, email: user.email, userName: user.userName, domain: decoded.domain,
            }

            const jwtToken = jwt.sign(tokenObj, config.jwt.secret, { expiresIn: '2h' })

            res.send({
                message: 'Welcome', token: jwtToken, permissions: role.permissions, user,
            })
        } else {
            next(new Error('Token Not Verified'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = me
