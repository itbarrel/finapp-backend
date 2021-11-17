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
                    AccountTypes: ['*'],
                    FormSubmissions: ['*'],

                },
                default: true,
            },
            {
                name: 'Information Provider',
                permissions: {},
                default: true,
            },
            {
                name: 'Information Manager',
                permissions: {},
                default: true,
            },
        ]

        this.entities = ['Users', 'Departments', 'Incidents', 'Tasks']
        this.operations = ['*', 'view', 'create', 'update', 'delete']
    }

    async createDefaultRolesFor() {
        return Promise.all(this.mainRoles.map(async (role) => {
            await this.model.create(role)
        }))
    }

    async getPermissionEntities() {
        const { operations, entities } = this
        return { operations, entities }
    }
}

module.exports = RoleService
