const Joi = require('joi')

const headers = {
    headers: Joi.object().keys({
        token: Joi.string().required(),
    }).options({ allowUnknown: true }),
}

const allResources = {
    query: Joi.object().keys({
        limit: Joi.number().integer(),
        offset: Joi.number().integer(),
    }).options({ allowUnknown: true }),
}

const getResource = {
    params: Joi.object().keys({
        id: Joi.string().required().guid(),
    }),
}

module.exports = {
    headers,
    allResources,
    getResource,
}
