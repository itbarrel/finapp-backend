const { AccountTypeService } = require('../resources')

const create = async () => {
    const AccountType = new AccountTypeService('public')

    const Bank = {
        name: 'Bank',
        description: 'bank accounttype',
    }

    const EMS = {
        name: 'EMS',
        description: 'EMS accounttype',
    }

    await AccountType.create(Bank)
    await AccountType.create(EMS)
}

const destroy = async () => AccountTypeService.delete({})

module.exports = { create, destroy }
