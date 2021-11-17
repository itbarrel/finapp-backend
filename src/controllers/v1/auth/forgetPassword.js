const jwt = require('jsonwebtoken')
const config = require('../../../../config')
const storage = require('../../../utils/cl-storage')

const { UserService } = require('../../../services/resources')
const { EmailService } = require('../../../services')

const forgetPassword = async (req, res, next) => {
    try {
        const domain = storage.get('domain')

        const User = new UserService(domain)

        const { email } = req.body
        const user = await User.findByQuery({ email }, true)

        if (user) {
            const jwtToken = jwt.sign(
                {
                    id: user.id, email: user.email, userName: user.userName, domain,
                },
                config.jwt.secret, { expiresIn: '0.5h' },
            )
            const { id } = user
            const resetToken = { resetPasswordToken: jwtToken }
            const updatedUser = await User.update(resetToken, { id })
            await EmailService.forgetPasswordEmail(updatedUser.email,
                updatedUser.firstName, updatedUser.resetPasswordToken)

            res.send({ message: 'Forget Password', Token: jwtToken })
        } else {
            next(new Error('User Not Found'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = forgetPassword
