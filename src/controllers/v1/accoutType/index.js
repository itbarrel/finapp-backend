const { AccountTypeService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query
        const AccountType = new AccountTypeService()

        const { docs, pages, total } = await AccountType.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const AccountType = new AccountTypeService()

        const accountType = await AccountType.create(req.body)

        res.send(accountType)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const AccountType = new AccountTypeService()

        const { id } = req.params
        const accountType = await AccountType.findById(id)

        res.send(accountType)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const AccountType = new AccountTypeService()

        const { id } = req.params
        const accountType = await AccountType.update(req.body, { id })

        res.send(accountType)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const AccountType = new AccountTypeService()

        const { id } = req.params
        const accountType = await AccountType.delete({ id })
        res.send(accountType)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
