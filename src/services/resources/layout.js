const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')

class LayoutService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.Layout)
        this.domain = domain
    }

    async all(query = {}, offset = 1, limit = 20) {
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,

        }
        const layouts = await this.model.paginate(options)
        layouts.docs.unshift({ id: 0, name: 'Basic' })
        layouts.total += 1
        return layouts
    }
}

module.exports = LayoutService
