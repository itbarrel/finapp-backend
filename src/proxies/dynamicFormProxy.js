const axios = require('axios').default
const config = require('../../config')

const token = config.DynamicFormToken
class DynamicFormProxy {
    constructor() {
        this.url = config.DynamicFormUrl
        this.headers = { token }
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

    async getForm(formId, dynamicFormAccountApikey) {
        const form = await axios({
            method: 'get',
            url: `${this.url}v1/forms/${formId}`,
            headers: { ...this.headers, authorization: dynamicFormAccountApikey },
        })

        return form
    }
}
module.exports = new DynamicFormProxy()
