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

    async all(query = {}, offset = 1, limit = 50) {
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
            include: ['User'],
        }

        if (status === 'completed') {
            options.paranoid = false
        }

        return this.model.paginate(options)
    }

    async create(obj = {}) {
        const { parentId, formId, ...rest } = obj
        let submission = await this.model.findOne({ where: { parentId, formId, parentType: 'user' } })
        if (submission) {
            submission = await submission.update(rest)
        } else {
            submission = this.model.create(obj)
        }
        return submission
    }

    async complete(obj = {}) {
        const {
            parentId, formId, dynamicFormAccountId,
        } = obj
        const domain = storage.get('domain')
        if (!dynamicFormAccountId) throw new Error('No Account Found to send Details')

        const Account = new AccountService()
        const recieverAccount = await Account.findByQuery({ dynamicFormAccountId })
        if (!recieverAccount) throw new Error('No Account Found to send Details')

        // Find the data
        const formData = await this.model.findOne({ where: { parentId, formId, parentType: 'user' } })
        if (!formData) throw new Error('No Submitted data Found')

        // Create replica of user for external user
        const userService = new UserService()
        const user = await userService.findByQuery({ id: parentId }, true)
        const role = await user.getRole()
        if (!user) throw new Error('No User data Found')

        const { tenant_name: tenantName } = recieverAccount
        const { data } = formData

        const userObjToCreate = {
            tenantName: domain,
            userId: parentId,
            userName: user.userName,
            firstName: user.firstName,
            role: role.name,
            mobilePhone: user.mobilePhone,
            email: user.email,
        }

        // Deletes from previous Account
        await this.model.destroy({ where: { parentId, formId, parentType: 'user' } })

        // Create External User
        const recieverAccountService = new ExtrenalUserFormSubmissionService(tenantName)
        const externalUserService = new ExternalUserService(tenantName)

        const externalUser = await externalUserService.create(userObjToCreate)

        let submission = await recieverAccountService.findByQuery({
            parentId: externalUser.id, formId, parentType: 'externalUser',
        }, true)
        if (submission) {
            submission = await recieverAccountService.update({ data }, { parentId, formId })
        } else {
            submission = await recieverAccountService.create({ parentId: externalUser.id, formId, data })
        }
        return submission
    }

    async single(obj = {}) {
        const { parentId, formId } = obj
        const submission = await this.model.findOne({ where: { parentId, formId }, paranoid: false })
        if (!submission) {
            throw new Error('No Submitted Data Found')
        }
        return submission
    }
}

module.exports = UserFormSubmissionService
