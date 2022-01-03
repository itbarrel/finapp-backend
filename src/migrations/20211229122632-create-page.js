module.exports = {
  up: async (queryInterface, Sequelize) => {
    const upChange = async (schema) => {
      const table = { schema, tableName: 'pages' }
      await queryInterface.createTable(table, {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDv4,
        },
        path: {
          type: Sequelize.STRING,
        },
        LayoutId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'layouts',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
      const table = { schema, tableName: 'pages' }
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

