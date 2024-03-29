const { UserFormSubmissionService } = require('../../../services/resources')
const { ExtrenalUserFormSubmissionService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const {
            offset, limit, externalUser, ...query
        } = req.query
        let FormSubmission

        if (externalUser) {
            FormSubmission = new ExtrenalUserFormSubmissionService()
        } else {
            FormSubmission = new UserFormSubmissionService()
        }

        const { docs, pages, total } = await FormSubmission.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const FormSubmission = new UserFormSubmissionService()

        const formSubmission = await FormSubmission.create(req.body)

        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const FormSubmission = new UserFormSubmissionService()

        const { id } = req.params
        const formSubmission = await FormSubmission.findById(id)

        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const FormSubmission = new UserFormSubmissionService()

        const { id } = req.params
        const formSubmission = await FormSubmission.update(req.body, { id })

        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const FormSubmission = new UserFormSubmissionService()

        const { id } = req.params
        const formSubmission = await FormSubmission.delete({ id })
        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

const complete = async (req, res, next) => {
    try {
        const FormSubmission = new UserFormSubmissionService()

        const formSubmission = await FormSubmission.complete(req.body)

        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

const single = async (req, res, next) => {
    try {
        const FormSubmission = new UserFormSubmissionService()

        const formSubmission = await FormSubmission.single(req.query)

        res.send(formSubmission)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy, complete, single,
}
