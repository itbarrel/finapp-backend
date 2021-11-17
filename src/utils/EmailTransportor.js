const nodemailer = require('nodemailer')
const config = require('../../config')

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'apikey',
        pass: config.email.smtp.apikey,
    },
})
module.exports = transporter
