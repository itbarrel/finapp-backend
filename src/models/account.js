const {
    Model,
} = require('sequelize')
const sequelizePaginate = require('sequelize-paginate')
const { downcase, removeChars } = require('../utils')
const DynamicFormProxy = require('../proxies/dynamicFormProxy')

// const nonCopyTables = ['Account']

const modelOrder = ['Role', 'User', 'FormSubmission', 'ExternalUser']

module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            Account.belongsTo(models.AccountType, {
                foreignKey: 'accountTypeId',
                onDelete: 'cascade',
            })
        }
    }

    Account.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tenant_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        dynamicFormAccountId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        dynamicFormAccountApikey: {
            type: DataTypes.STRING,
        },
        accountTypeId: DataTypes.UUID,
        description: DataTypes.TEXT,
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
        modelName: 'Account',
        tableName: 'accounts',
        paranoid: true,
        // class methods
        classMethods: {
            active: async () => { },
        },
        indexes: [
            {
                unique: true,
                name: 'unique_account_name',
                fields: [sequelize.fn('lower', sequelize.col('name'))],
            },
        ],
        hooks: {
            beforeValidate: (account) => {
                account.tenant_name = removeChars(downcase(account.name))
                return account
            },
            beforeCreate: async (account) => {
                await sequelize.createSchema(account.tenant_name)
                let currentItem
                for (let i = 0; i < modelOrder.length; i += 1) {
                    currentItem = modelOrder[i]
                    // eslint-disable-next-line no-await-in-loop
                    await sequelize.models[currentItem].schema(account.tenant_name).sync({
                        force: true,
                        alter: true,
                    })
                }

                return account
            },
            afterCreate: async (account) => {
                const accountType = await account.getAccountType()
                if (accountType.name === 'Bank') {
                    const dynamicForm = await DynamicFormProxy.createAccount({ name: account.tenant_name })
                    account.dynamicFormAccountId = dynamicForm.data.id
                    account.dynamicFormAccountApikey = dynamicForm.data.apikey
                    await account.save()
                }

                return account
            },
        },
    })

    // class methods
    Account.byId = async (id) => Account.findOne({
        where: { id },
    })

    // instance methods
    // Account.prototype.toJSON = function () {
    //     return { id: this.id };
    // };

    // Account.plugin(paginate);
    sequelizePaginate.paginate(Account)

    return Account
}
