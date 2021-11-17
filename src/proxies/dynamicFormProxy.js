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
}
module.exports = new DynamicFormProxy()
