const axios = require('axios').default
const config = require('../../config')

const storage = require('../utils/cl-storage')
const account = storage.get('account')

console.log("procxy account", { account });



const token = config.DynamicFormToken
class DynamicFormProxy {
    constructor() {
        this.url = config.DynamicFormUrl
        this.headers = { token, authorization: account.dynamicFormAccountApikey }
    }

    async createAccount(obj = {}) {
        const addedAccount = await axios({
            method: 'post',
            url: `${this.url}v1/accounts`,
            data: obj,
            headers: this.headers,
        })

        return addedAccount
    }
    async getForm(obj = {}) {
        console.log("getForm procxy");
        const getedForm = await axios({
            method: 'get',
            url: `${this.url}v1/forms/${obj.id}`,
            headers: this.headers,
        })

        return getedForm
    }
}
module.exports = new DynamicFormProxy()
