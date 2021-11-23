const { Op } = require('sequelize')
const models = require('../../models')
const storage = require('../../utils/cl-storage')
const ResourceService = require('./resource')
const AccountService = require('./account')
const UserService = require('./user')
const ExternalUserService = require('./externalUser')
const ExtrenalUserFormSubmissionService = require('./externalUserformSubmission')

class UserFormSubmissionService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.UserFormSubmission)
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
        }

        if (status === 'completed') {
            options.paranoid = false
        }

        return this.model.paginate(options)
    }

    async create(obj = {}) {
        const { userId, formId, ...rest } = obj
        let submission = await this.model.findOne({ where: { userId, formId } })
        if (submission) {
            submission = await submission.update(rest)
        } else {
            submission = this.model.create(obj)
        }
        return submission
    }

    async complete(obj = {}) {
        const {
            userId, formId, dynamicFormAccountId,
        } = obj
        if (!dynamicFormAccountId) throw new Error('No Account Found to send Details')

        const Account = new AccountService()
        const recieverAccount = await Account.findByQuery({ dynamicFormAccountId })
        if (!recieverAccount) throw new Error('No Account Found to send Details')

        // Find the data

        const formData = await this.model.findOne({ where: { userId, formId } })
        if (!formData) throw new Error('No Submitted data Found')

        // Create replica of user for external user
        const userService = new UserService()
        const externalUser = await userService.findone({ where: { id: userId } })

        // Deletes from previous Account
        await this.model.destroy({ where: { userId, formId } })

        const { data } = formData
        // Deletes from previous Account
        const { tenant_name: tenantName } = recieverAccount

        // Create External User
        const recieverAccountService = new ExtrenalUserFormSubmissionService(tenantName)

        const externalUserService = new ExternalUserService(tenantName)

        await externalUserService.create({ externalUser })

        let submission = await recieverAccountService.findByQuery({ userId, formId }, true)
        if (submission) {
            submission = await recieverAccountService.update({ data }, { userId, formId })
        } else {
            submission = await recieverAccountService.create({ userId, formId, data })
        }
        return submission
    }

    async single(obj = {}) {
        const { userId, formId } = obj
        const submission = await this.model.findOne({ where: { userId, formId } })
        if (!submission) {
            throw new Error('No Submitted Data Found')
        }
        return submission
    }
}

module.exports = UserFormSubmissionService
