const { transporter } = require('../utils')
const logger = require('../../config/logger')
const config = require('../../config')

class EmailService {
    constructor() {
        // eslint-disable-next-line no-unused-vars
        const defaultMailOptions = {
            from: config.email.from,
            to: 'someone@yopmail.com',
            subject: 'NodeJs App',
            text: 'Hello Sir/Miss, hope you are fine. This can be a test mail.',
        }
    }

    async sendEmail(mailOptions = this.defaultMailOptions) {
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.info(error)
            } else {
                logger.info(`Email sent: ${info.response}`)
            }
        })
    }

    async signUpEmail(email, name, password) {
        const mailOptions = {
            from: config.email.from,
            to: email,
            subject: 'Welcome to the Project',
            text: `Hello ${name}, hope you are fine . Welcome onboard.your Email is ${email} and Password is ${password}`,
        }

        await this.sendEmail(mailOptions)
    }

    async forgetPasswordEmail(email, name, token) {
        const { frontenddomain } = config
        const link = `${frontenddomain}auth/reset-password?token=${token}`
        const mailOptions = {
            from: config.email.from,
            to: email,
            subject: 'Forget Password Email',
            text: `Hello ${name}, hope you are fine . Welcome onboard. Your Reset Password Link is ${link}`,
        }

        await this.sendEmail(mailOptions)
    }
}

module.exports = new EmailService()
