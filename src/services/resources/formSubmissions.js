const models = require('../../models')
const storage = require('../../utils/cl-storage')

const ResourceService = require('./resource')
const AccountService = require('./account')

class FormSubmissionsService extends ResourceService {
    constructor(tenantName) {
        const decoded = storage.get('decoded')
        const domain = tenantName || decoded.domain
        const schemaModels = models(domain)
        super(schemaModels.FormSubmission)
        this.domain = domain
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
            userId, formId, dynamicFormAccountId, data,
        } = obj
        if (!dynamicFormAccountId) throw new Error('No Account Found to send Details')

        const Account = new AccountService()
        const recieverAccount = await Account.findByQuery({ dynamicFormAccountId })
        if (!recieverAccount) throw new Error('No Account Found to send Details')

        // Deletes from previous Account
        this.model.destroy({ where: { userId, formId } })

        // Deletes from previous Account
        const { tenant_name: tenantName } = recieverAccount
        const recieverAccountService = new FormSubmissionsService(tenantName)

        let submission = await recieverAccountService.findByQuery({ userId, formId }, true)
        if (submission) {
            submission = await recieverAccountService.update({ data }, { userId, formId })
        } else {
            submission = recieverAccountService.create({ userId, formId, data })
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

module.exports = FormSubmissionsService
