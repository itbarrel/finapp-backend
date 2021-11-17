const { RoleService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const Role = new RoleService()

        const { docs, pages, total } = await Role.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const Role = new RoleService()

        const register = req.body
        const role = await Role.create(register)

        res.send({ message: 'Roles is created', role })
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const Role = new RoleService()

        const { id } = req.params
        const roles = await Role.findById(id)

        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const Role = new RoleService()

        const { id } = req.params
        const roles = await Role.update(req.body, { id })

        res.send(roles)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Role = new RoleService()

        const { id } = req.params
        await Role.delete({ id })

        res.send({ message: 'role is deleted' })
    } catch (error) {
        next(error)
    }
}

const entities = async (req, res, next) => {
    try {
        const Role = new RoleService()

        const permissionEntities = await Role.getPermissionEntities()

        res.send(permissionEntities)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy, entities,
}
