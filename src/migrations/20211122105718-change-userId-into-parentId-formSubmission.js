module.exports = {
    up: async (queryInterface) => {
        const upChange = async (schema) => {
            const table = { schema, tableName: 'formSubmissions' }
            await queryInterface.renameColumn(
                table,
                'userId',
                'parentId',
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

    down: async () => {
    },
}
