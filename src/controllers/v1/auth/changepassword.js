const { UserService } = require('../../../services/resources')
const storage = require('../../../utils/cl-storage')

const changepassword = async (req, res, next) => {
    try {
        const decoded = storage.get('decoded')

        const User = new UserService()

        const { oldPassword, newPassword } = req.body
        const user = await User.findByQuery({ email: decoded.email }, true)

        if (user) {
            const verification = await user.validatePassword(oldPassword)
            if (verification) {
                user.password = newPassword
                await user.save()
                res.send({
                    message: 'Password is updated successfully',
                })
            } else {
                next(new Error('Password do not match'))
            }
        } else {
            next(new Error('User Not Found'))
        }
    } catch (error) {
        next(error)
    }
}

module.exports = changepassword
