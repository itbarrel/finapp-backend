const config = require('../../config')
const storage = require('../utils/cl-storage')

module.exports = (req, res, next) => {
    storage.run(async () => {
        try {
            const defaultDomain = config.DefaultTenantName
            const domainObj = { domain: defaultDomain }

            const { domain } = domainObj
            storage.set('decoded', domainObj)

            if (domain && domain !== '') {
                storage.set('domain', domain)
                next()
            } else {
                return res.status(404).send({ message: 'Invalid Domain Found' })
            }
        } catch (error) {
            next(error)
        }
    })
}
