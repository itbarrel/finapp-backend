const models = require('../../models')
const storage = require('../../utils/cl-storage')
const ResourceService = require('./resource')

class RoleService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.Role)
        this.domain = domain

        this.mainRoles = [
            {
                name: 'Admin',
                permissions: {
                    Roles: ['*'],
                    Users: ['*'],
                    Forms: ['*'],
                    FormSubmissions: ['*'],
                    Layouts: ['*'],
                },
                default: true,
            },
            {
                name: 'Moderator',
                permissions: { FormSubmissions: ['*'] },
                default: true,
            },
            {
                name: 'Customer',
                permissions: { FormSubmissions: ['*'] },
                default: true,
            },
        ]

        this.entities = ['Users', 'FormSubmissions']
        this.bankEntities = ['Layouts']
        this.operations = ['*', 'view', 'create', 'update', 'delete']
    }

    async createDefaultRolesFor() {
        return Promise.all(this.mainRoles.map(async (role) => this.model.create(role)))
    }

    async getPermissionEntities() {
        const account = storage.get('account')
        const { name } = await account.getAccountType()

        const { operations, bankEntities, entities } = this

        const finalEntities = (name === 'Bank') ? entities.concat(bankEntities) : entities
        return { operations, entities: finalEntities }
    }
}

module.exports = RoleService
