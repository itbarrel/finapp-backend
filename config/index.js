const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../.env') })

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test', 'docker').required(),
        SERVER_PORT: Joi.number().default(3000),
        DB_URL: Joi.string().required().description('Mongo DB url'),
        JWT_SECRET: Joi.string().description('JWT secret for Token generation'),
        BCRYPT_SECRET: Joi.string().description('BCRYPT secret for Salt generation'),
        SMTP_SENDER_EMAIL: Joi.string().description('SMTP sender Email'),
        SMTP_USERNAME: Joi.string().description('SMTP credential Email'),
        SMTP_PASSWORD: Joi.string().description('SMTP credential Password'),
        SMTP_APIKEY: Joi.string().description('Mail sending SMTP API key'),
        FRONT_END_DOMAIN: Joi.string().description('Front_End Domain URL'),
        Dynamic_Form_Token: Joi.string().description('Dynamic Form Token'),
        Dynamic_Form_URL: Joi.string().description('Dynamic Form URL'),
        DEFAULT_TENANT_NAME: Joi.string().required().description('Default Tenant Name'),
    })
    .unknown()

const { value: env, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
    env: env.NODE_ENV || 'development',
    port: env.SERVER_PORT || 3000,
    postgres: {
        url: env.DB_URL + (env.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    bcrypt: {
        secret: env.BCRYPT_SECRET || 'secret',
    },
    jwt: {
        secret: env.JWT_SECRET || 'secret',
        accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    email: {
        smtp: {
            host: env.SMTP_HOST,
            port: env.SMTP_PORT,
            auth: {
                user: env.SMTP_USERNAME,
                pass: env.SMTP_PASSWORD,
            },
            apikey: env.SMTP_APIKEY || null,
        },
        from: env.SMTP_SENDER_EMAIL || 'someone@yopmail.com',
    },
    frontEndDomain: env.FRONT_END_DOMAIN || null,
    DynamicFormToken: env.Dynamic_Form_Token || null,
    DynamicFormUrl: env.Dynamic_Form_URL || null,
    DefaultTenantName: env.DEFAULT_TENANT_NAME || 'finapp',
}
