const Joi = require('joi')

const useroObj = {
    body: Joi.object().keys({
        id: Joi.string(),
        userName: Joi.string().required(),
        firstName: Joi.string(),
        middleName: Joi.string(),
        lastName: Joi.string(),
        RoleId: Joi.string(),
        email: Joi.string(),
        avatar: Joi.string(),
        password: Joi.string(),
        officePhone: Joi.string(),
        mobilePhone: Joi.string(),
        countryCode: Joi.string(),
        country: Joi.string(),
        previousEmail: Joi.string(),
        resetPasswordToken: Joi.string(),
        available: Joi.string(),
        links: Joi.string(),
        type: Joi.string(),
        active: Joi.boolean(),
    }),
}

module.exports = {
    useroObj,
}
