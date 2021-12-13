const storage = require('../utils/cl-storage')

const { AccountService } = require('../services/resources')

const verifyAccount = async (req, res, next) => {
    const domain = storage.get('domain')

    const Account = new AccountService(domain)

    storage.run(async () => {
        try {
            let account
            if (domain) {
                if (domain === 'public') {
                    account = { id: 0, tenant_name: 'public' }
                } else {
                    account = await Account.findByQuery({ tenant_name: domain }, true)
                }
            } else {
                throw Error('Invalid Domain Found')
            }

            if (account) {
                storage.set('account', account)
                console.log("............////", account);
                next()
            } else {
                throw Error('Invalid Domain Token')
            }
        } catch (error) {
            next(error)
        }
    })
}

module.exports = verifyAccount
