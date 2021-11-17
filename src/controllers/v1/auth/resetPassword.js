const { UserService } = require('../../../services/resources')

const resetPassword = async (req, res, next) => {
    try {
        const User = new UserService()

        const { token, password } = req.body

        const user = await User.findByQuery({ resetPasswordToken: token }, true)
        if (user) {
            user.password = password
            user.resetPasswordToken = null
            await user.save()
            res.send({ message: 'Password reset successfully' })
        } else {
            next(new Error('User Not Found'))
        }
    } catch (error) {
        next(error)
    }
}
module.exports = resetPassword
