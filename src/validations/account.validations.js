const Joi = require('joi')

const accountObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string().required(),
        accountTypeId: Joi.string(),
        tenant_name: Joi.string(),
        description: Joi.string(),
        active: Joi.boolean(),
        admin: Joi.object().keys({
            userName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
        }),
    }),
}

module.exports = {
    accountObj,
}
