const { Sequelize } = require('sequelize')

const config = require('../../config')
const logger = require('../../config/logger')

const sequelize = new Sequelize(config.postgres.url, {
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
})

try {
    sequelize
        .authenticate()
        .then(() => {
            logger.info('Database connection has been established successfully.')
        })
        .catch((error) => {
            logger.error('Unable to connect to the database: ', error)
        })
} catch (error) {
    logger.error('Unable to connect to the database: ', error)
}

module.exports = sequelize
