const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class AccountTypeService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.AccountType)
        this.domain = domain
    }
}

module.exports = AccountTypeService
