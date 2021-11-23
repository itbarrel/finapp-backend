module.exports = {
    up: async (queryInterface, Sequelize) => {
        const upChange = async (schema) => {
            const table = { schema, tableName: 'formSubmissions' }
            await queryInterface.addColumn(
                table,
                'parentType',
                Sequelize.STRING,
            )
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
            const table = { schema, tableName: 'formSubmissions' }
            await queryInterface.removeColumn(
                table,
                'parentType',
            )
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
