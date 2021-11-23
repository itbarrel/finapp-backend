module.exports = {
    up: async (queryInterface, Sequelize) => {
        const upChange = async (schema) => {
            const table = { schema, tableName: 'externalUsers' }
            await queryInterface.createTable(table, {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDv4,
                },
                userName: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                firstName: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                middleName: {
                    type: Sequelize.STRING,
                },
                lastName: {
                    type: Sequelize.STRING,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                tenantName: {
                    type: Sequelize.STRING,
                },
                userId: {
                    type: Sequelize.UUID,
                },
                role: {
                    type: Sequelize.STRING,
                },
                avatar: {
                    type: Sequelize.TEXT,
                },
                officePhone: {
                    type: Sequelize.STRING,
                },
                mobilePhone: {
                    type: Sequelize.STRING,
                },
                countryCode: {
                    type: Sequelize.STRING,
                },
                country: {
                    type: Sequelize.STRING,
                },
                active: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: true,
                    type: Sequelize.DATE,
                },
                deletedAt: {
                    allowNull: true,
                    type: Sequelize.DATE,
                },
            })
        }
        await upChange('public')
        const schemas = await queryInterface.sequelize.showAllSchemas({
            options: {},
        })
        return schemas.forEach(async (schema) => {
            await upChange(schema)
        })
    },
    down: async (queryInterface) => {
        const downChange = async (schema) => {
            const table = { schema, tableName: 'externalUsers' }
            await queryInterface.dropTable(table)
        }

        await downChange('public')
        const schemas = await queryInterface.sequelize.showAllSchemas({
            options: {},
        })
        return schemas.forEach(async (schema) => {
            await downChange(schema)
        })
    },
}
