const express = require('express')

const router = express.Router()
const loginController = require('../../controllers/v1/auth')
// const validate = require('../../middlewares/validate')
// const { generalValidations } = require('../../validations')
const verifyAccount = require('../../middlewares/verifyAccount')
const setDomainFromBody = require('../../middlewares/setDomainFromBody')

router.post('/login', setDomainFromBody(true), verifyAccount, loginController.login)
router.post('/forgetpassword', setDomainFromBody(true), verifyAccount, loginController.forgetPassword)
router.post('/resetpassword', setDomainFromBody(false), verifyAccount, loginController.resetPassword)
router.post('/me', setDomainFromBody(false), verifyAccount, loginController.me)
router.post('/changepassword', setDomainFromBody(false), verifyAccount, loginController.changepassword)
module.exports = router
