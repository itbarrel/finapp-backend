const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')
const RoleService = require('./role')

class UserService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.User)
        this.domain = domain
    }

    async createDefaultUsersFor(userObj) {
        const Role = new RoleService(this.domain)
        const role = await Role.findByQuery({ value: 'admin' })
        userObj.RoleId = role.id
        await this.model.create(userObj)
    }
}

module.exports = UserService
