const config = require('.')

module.exports = {
    development: {
        url: config.postgres.url,
        dialect: 'postgres',
    },
    test: {
        url: config.postgres.url,
        dialect: 'postgres',
    },
    docker: {
        url: config.postgres.url,
        dialect: 'postgres',
    },
    production: config.postgres.url,
}
