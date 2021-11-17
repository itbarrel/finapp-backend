const Joi = require('joi')

const roleObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string().required(),
        value: Joi.string(),
        default: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    roleObj,
}
