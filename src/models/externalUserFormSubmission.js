const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class ExternalUserFormSubmission extends Model {
        static associate(models) {
            ExternalUserFormSubmission.belongsTo(models.ExternalUser, {
                foreignKey: 'parentId',
            })
        }
    }
    ExternalUserFormSubmission.init({
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
            defaultValue: 'externalUser',
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
        modelName: 'ExternalUserFormSubmission',
        tableName: 'formSubmissions',
        paranoid: true,
    })
    sequelizePaginate.paginate(ExternalUserFormSubmission)
    return ExternalUserFormSubmission
}
