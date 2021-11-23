const {
    Model,
} = require('sequelize')
const bcrypt = require('bcrypt')
const sequelizePaginate = require('sequelize-paginate')
const { EmailService } = require('../services')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: {
                    allowNull: false,
                },
                onDelete: 'cascade',
            })
            User.hasMany(models.UserFormSubmission, {
                foreignKey: 'parentId',
                constraints: false,
                onDelete: 'cascade',
                scope: {
                    parentType: 'user',
                },
            })
        }
    }

    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: true, len: [2, 225] },
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
            validate: { isEmail: true },
        },
        avatar: {
            type: DataTypes.TEXT,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        officePhone: {
            type: DataTypes.STRING,
        },
        mobilePhone: {
            type: DataTypes.STRING,
            validate: { len: [11, 11] },
        },
        countryCode: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        lastEmailActivation: {
            type: DataTypes.DATE,
        },
        lastUpdatePassword: {
            type: DataTypes.DATE,
        },
        previousEmail: {
            type: DataTypes.STRING,
            validate: { isEmail: true },
        },
        available: {
            type: DataTypes.BOOLEAN,
            default: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        resetPasswordToken: {
            type: DataTypes.TEXT,
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
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        // class methods
        classMethods: {
            active: async () => { },
        },
        indexes: [
            {
                unique: true,
                name: 'unique_user_name',
                fields: [sequelize.fn('lower', sequelize.col('userName'))],
            },
        ],
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = bcrypt.genSaltSync(10)
                    user.password = bcrypt.hashSync(user.password, salt)
                }
            },
            // afterCreate: async (user) => {
            //     return user
            // },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = bcrypt.genSaltSync(10)
                    user.password = bcrypt.hashSync(user.password, salt)
                }
            },
        },

    })

    // class methods
    User.byId = async (id) => User.findOne({
        where: { id },
    })

    // instance methods
    // User.prototype.toJSON = function () {
    //     return {};
    // };

    User.prototype.validatePassword = async function (password) {
        return bcrypt.compare(password, this.password)
    }

    User.prototype.signUpEmail = async function (password, domain) {
        return EmailService.signUpEmail(this.email, this.userName, password, domain)
    }
    sequelizePaginate.paginate(User)
    return User
}
