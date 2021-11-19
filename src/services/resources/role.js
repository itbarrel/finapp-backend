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
                },
                default: true,
            },
            {
                name: 'Moderator',
                permissions: { FormSubmissions: ['*'] },
                default: true,
            },
        ]

        this.entities = ['Users', 'FormSubmissions']
        this.operations = ['*', 'view', 'create', 'update', 'delete']
    }

    async createDefaultRolesFor() {
        return Promise.all(this.mainRoles.map(async (role) => this.model.create(role)))
    }

    async getPermissionEntities() {
        const { operations, entities } = this
        return { operations, entities }
    }
}

module.exports = RoleService
