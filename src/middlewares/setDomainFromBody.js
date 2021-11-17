const jwt = require('jsonwebtoken')
const config = require('../../config')
const storage = require('../utils/cl-storage')

const badErrors = ['JsonWebTokenError', 'TokenExpiredError']

const setDomainFromBody = (isBody) => (req, res, next) => {
    storage.run(async () => {
        try {
            let domainObj
            if (isBody) {
                domainObj = req.body
            } else {
                const token = req.body.token || req.headers.token || req.query.token || req.headers['x-access-token']
                if (!token) {
                    return res.status(403).send('A token is required for authentication')
                }
                domainObj = jwt.verify(token, config.jwt.secret)
            }

            const { domain } = domainObj
            storage.set('decoded', domainObj)

            if (domain && domain !== '') {
                storage.set('domain', domain)
                next()
            } else {
                return res.status(404).send({ message: 'Invalid Domain Found' })
            }
        } catch (error) {
            if (error && badErrors.includes(error.name)) {
                return res.status(401).send({ message: error.message })
            }

            next(error)
        }
    })
}

module.exports = setDomainFromBody
