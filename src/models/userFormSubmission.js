const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class UserFormSubmission extends Model {
        static associate(models) {
            UserFormSubmission.belongsTo(models.User, {
                foreignKey: 'parentId',
            })
        }
    }
    UserFormSubmission.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        parentId: {
            type: DataTypes.UUID,
        },
        parentType: {
            type: DataTypes.STRING,
        },
        formId: {
            type: DataTypes.UUID,
        },
        data: {
            type: DataTypes.JSON,
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
        modelName: 'UserFormSubmission',
        tableName: 'formSubmissions',
        paranoid: true,
    })
    sequelizePaginate.paginate(UserFormSubmission)
    return UserFormSubmission
}
