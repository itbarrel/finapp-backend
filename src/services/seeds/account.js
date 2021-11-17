const faker = require('faker')
const { AccountService } = require('../resources')

const fakeData = false
const maxfakeCount = 5
const maxCount = (fakeData) ? maxfakeCount : 1
let accountObj = {
    name: 'CrisisHub',
    description: 'Crisis Management System',
}

let emptyArray = [accountObj, ...new Array(maxfakeCount - 1).fill(0)]
emptyArray = emptyArray.slice(0, maxCount)

const create = async () => {
    for (let i = 0; i < emptyArray.length; i += 1) {
        if (fakeData) {
            accountObj = {
                name: faker.company.companyName(),
                description: faker.company.catchPhraseDescriptor(),
            }
        }

        // eslint-disable-next-line no-await-in-loop
        await AccountService.create(accountObj)
    }
}

const destroy = async () => {
    await AccountService.delete({})
}

module.exports = { create, destroy }
