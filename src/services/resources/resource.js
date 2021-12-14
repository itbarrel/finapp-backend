class ResourceService {
    constructor(model) {
        this.model = model
    }

    async all(query = {}, offset = 1, limit = 20) {
        const options = {
            // offset: offset * (limit + 1),
            where: query,
            page: offset,
            paginate: limit,

        }
        return this.model.paginate(options)
    }

    async create(obj = {}) {
        return this.model.create(obj)
    }

    async findById(id) {
        return this.model.findByPk(id)
    }

    async findByQuery(
        query = {},
        single = true,
        attribs = Object.keys(this.model.tableAttributes),
        include = [],
        offset = 0,
        limit = 20,
    ) {
        let attributes = attribs
        if (!(attributes instanceof Array)) {
            attributes = Object.keys(this.model.tableAttributes)
        }

        const fullQuery = {
            where: query, attributes, include, offset, limit,
        }

        return single
            ? this.model.findOne(fullQuery)
            : this.model.findAll(fullQuery)
    }

    async update(obj = {}, query = {}) {
        const updated = await this.model.update(obj, {
            where: query,
            validate: true,
            sideEffects: true,
            paranoid: true,
            returning: true,
        })
        if (!updated[1][0]) {
            throw new Error(`${this.model.name} not found.`)
        }
        return updated[1][0]
    }

    async delete(query = {}) {
        const result = await this.model.destroy({ where: query })
        if (!result) {
            throw new Error(`${this.model.name} not found.`)
        }
    }
}

module.exports = ResourceService
