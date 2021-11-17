const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class AccountType extends Model {
        static associate(models) {
            AccountType.hasMany(models.Account, {
                foreignKey: 'accountTypeId',
                onDelete: 'cascade',
            })
        }
    }
    AccountType.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'AccountType',
        tableName: 'accountTypes',
        paranoid: true,
    })
    sequelizePaginate.paginate(AccountType)
    return AccountType
}
