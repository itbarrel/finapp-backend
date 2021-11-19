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

    async create(obj = {}) {
        const { password } = obj
        const { domain } = this

        const user = await this.model.create(obj)
        await user.signUpEmail(password, domain)

        return user
    }

    async createDefaultUsersFor(userObj) {
        const Role = new RoleService(this.domain)
        const role = await Role.findByQuery({ value: 'admin' })
        userObj.RoleId = role.id
        const { password } = userObj
        const { domain } = this

        const user = await this.model.create(userObj)
        await user.signUpEmail(password, domain)
    }
}

module.exports = UserService
