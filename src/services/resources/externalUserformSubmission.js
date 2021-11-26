const { Op } = require('sequelize')
const models = require('../../models')
const storage = require('../../utils/cl-storage')
const ResourceService = require('./resource')

class ExtrenalUserFormSubmissionService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.ExternalUserFormSubmission)
        this.domain = domain
    }

    async all(query = {}, offset = 1, limit = 20) {
        const { status } = query
        if (status === 'completed') {
            delete query.status
            query.deletedAt = { [Op.ne]: null }
        }

        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,
            include: ['ExternalUser'],
        }

        if (status === 'completed') {
            options.paranoid = false
        }

        return this.model.paginate(options)
    }
}

module.exports = ExtrenalUserFormSubmissionService
