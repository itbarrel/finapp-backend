const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class FormSubmission extends Model {
        static associate() {
            // define association here
        }
    }
    FormSubmission.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        parentId: {
            type: DataTypes.UUID,
        },
        formId: {
            type: DataTypes.UUID,
        },
        data: {
            type: DataTypes.JSON,
        },
        parentType: {
            type: DataTypes.STRING,
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
        modelName: 'FormSubmission',
        tableName: 'formSubmissions',
        paranoid: true,
    })
    sequelizePaginate.paginate(FormSubmission)
    return FormSubmission
}
