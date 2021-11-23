const {
    Model,
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class ExternalUser extends Model {
        static associate(models) {
            ExternalUser.hasMany(models.ExternalUserFormSubmission, {
                foreignKey: 'parentId',
                constraints: false,
                onDelete: 'cascade',
                scope: {
                    parentType: 'externalUser',
                },
            })
        }
    }
    ExternalUser.init({
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDv4,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        middleName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tenantName: {
            type: DataTypes.STRING,
        },
        externalUserId: {
            type: DataTypes.UUID,
        },
        role: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.TEXT,
        },
        officePhone: {
            type: DataTypes.STRING,
        },
        mobilePhone: {
            type: DataTypes.STRING,
        },
        countryCode: {
            type: DataTypes.STRING,
        },
        country: {
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
            allowNull: true,
            type: DataTypes.DATE,
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'ExternalUser',
        tableName: 'externalUsers',
        paranoid: true,
    })
    return ExternalUser
}
