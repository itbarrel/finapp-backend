const express = require('express')
const swaggerUi = require('swagger-ui-express')

const router = express.Router()
const config = require('../../config')
const options = require('../swagger/options')
const swaggerDocument = require('../swagger')

const v1Routes = require('./v1')

const main = (req, res) => {
    res.send('Fin App Service available')
}

const defaultRoutes = [
    { path: '/v1/', route: v1Routes },
    { path: '/', route: main },
]

// routes available only in development mode
const devRoutes = [
    { path: '/docs', route: swaggerUi.serve },
]

if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route)
    })
    router.get('/docs', swaggerUi.setup(swaggerDocument, options))
}

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
