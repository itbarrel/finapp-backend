const Joi = require('joi')

const layoutObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        name: Joi.string().required(),
        value: Joi.string(),
        default: Joi.string(),
        active: Joi.boolean(),
    }),
}

const print = {
    body: Joi.object().keys({
        id: Joi.string().required().guid(),
        parentId: Joi.string().required().guid(),
        formId: Joi.string().required().guid(),
        layoutId: Joi.string().required(),
    }),
}

module.exports = {
    layoutObj, print,
}
