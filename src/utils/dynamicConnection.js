const { Sequelize } = require('sequelize')
const config = require('../../config')

module.exports = (schema) => {
    const sequelize = new Sequelize(config.postgres.url, {
        dialect: 'postgres',
        schema,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
    })

    return sequelize
}
