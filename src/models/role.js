const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')
const { downcase, removeChars } = require('../utils')

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            Role.hasMany(models.User, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
        }
    }

    Role.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        permissions: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        default: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        modelName: 'Role',
        tableName: 'roles',
        paranoid: true,
        // class methods
        classMethods: {
            active: async () => { },
        },
        indexes: [
            {
                unique: true,
                name: 'unique_role_name',
                fields: [sequelize.fn('lower', sequelize.col('name'))],
            },
        ],
        hooks: {
            // eslint-disable-next-line no-unused-vars
            beforeValidate: (role) => {
                role.value = removeChars(downcase(role.name))
                return role
            },
        },
    })

    // class methods
    Role.byId = async (id, tenantName) => Role.schema(tenantName).findOne({
        where: { id },
    })

    // instance methods
    // Role.prototype.toJSON = function () {
    //     return { id: this.id };
    // };

    // Role.plugin(paginate);
    sequelizePaginate.paginate(Role)

    return Role
}
