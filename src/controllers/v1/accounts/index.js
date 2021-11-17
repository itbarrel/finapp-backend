const { AccountService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query
        const Account = new AccountService()

        const { docs, pages, total } = await Account.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const Account = new AccountService()

        const account = await Account.create(req.body)

        res.send(account)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const Account = new AccountService()

        const { id } = req.params
        const account = await Account.findById(id)

        res.send(account)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const Account = new AccountService()

        const { id } = req.params
        const account = await Account.update(req.body, { id })

        res.send(account)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Account = new AccountService()

        const { id } = req.params
        const account = await Account.delete({ id })

        res.send(account)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
