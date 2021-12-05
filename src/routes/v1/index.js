const express = require('express')

const router = express.Router()

const verifyUserPermissions = require('../../middlewares/verifyUserPermissions')
const { generalValidations } = require('../../validations')

const validate = require('../../middlewares/validate')

const authRoute = require('./auth')
const accountRoute = require('./accounts')
const roleRoute = require('./roles')
const userRoute = require('./users')
const accountTypeRoute = require('./accountType')
const formSubmissionRoute = require('./formSubmission')
const customerRoute = require('./customers')

const verifyAccount = require('../../middlewares/verifyAccount')
const setDomainFromBody = require('../../middlewares/setDomainFromBody')
const setDefaultTenant = require('../../middlewares/setDefaultTenant')

const necessaryMiddlewares = [
    validate(generalValidations.headers),
    setDomainFromBody(false),
    verifyAccount,
    verifyUserPermissions,
]

const routes = [
    { path: '/users', routes: [...necessaryMiddlewares, userRoute] },
    { path: '/roles', routes: [...necessaryMiddlewares, roleRoute] },
    { path: '/accounts', routes: [...necessaryMiddlewares, accountRoute] },
    { path: '/accountTypes', routes: [...necessaryMiddlewares, accountTypeRoute] },
    { path: '/formSubmissions', routes: [...necessaryMiddlewares, formSubmissionRoute] },
    { path: '/customers', routes: [setDefaultTenant, verifyAccount, customerRoute] },
    { path: '/auth', routes: [authRoute] },
]

routes.forEach((route) => {
    router.use(route.path, ...route.routes)
})

module.exports = router
