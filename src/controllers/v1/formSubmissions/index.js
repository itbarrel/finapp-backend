const { FormSubmissionsService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query
        const FormSubmission = new FormSubmissionsService()

        const { docs, pages, total } = await FormSubmission.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const FormSubmission = new FormSubmissionsService()

        const formSubmission = await FormSubmission.create(req.body)

        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const FormSubmission = new FormSubmissionsService()

        const { id } = req.params
        const formSubmission = await FormSubmission.findById(id)

        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const FormSubmission = new FormSubmissionsService()

        const { id } = req.params
        const formSubmission = await FormSubmission.update(req.body, { id })

        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const FormSubmission = new FormSubmissionsService()

        const { id } = req.params
        const formSubmission = await FormSubmission.delete({ id })
        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
