/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// const formLayout = require('../../../../layouts/signUp')
// const { signUplayout } = require('../../../../layouts')
const path = require('path')

const storage = require('../../../utils/cl-storage')
const { LayoutService, ExtrenalUserFormSubmissionService } = require('../../../services/resources')
const DynamicFormProxy = require('../../../proxies/dynamicFormProxy')
const config = require('../../../../config')
const pdfGenerator = require('../../../utils/pdfGenerator')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query
        const Layout = new LayoutService()

        const { docs, pages, total } = await Layout.all(query, offset, limit)

        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const print = async (req, res, next) => {
    try {
        const { parentId, formId, layoutId } = req.body
        const basicLayout = (layoutId === 0 || layoutId === '0')
        let layout = {}
        if (basicLayout) {
            layout = { id: 0, name: 'Basic', path: config.DefaultLayoutPath }
        } else {
            const Layout = new LayoutService()
            layout = await Layout.findByQuery({ id: layoutId }, true)

            if (!layout) {
                throw new Error('No valid Layout found.')
            }

            if (formId !== layout.formId) {
                throw new Error('Layout is not attached to this requested form.')
            }
        }

        const account = storage.get('account')
        const domain = storage.get('domain')
        const { dynamicFormAccountApikey } = account
        const { data: form } = await DynamicFormProxy.getForm(formId, dynamicFormAccountApikey)

        if (!form) {
            throw new Error('No Form found for the submission')
        }

        const Submission = new ExtrenalUserFormSubmissionService(domain)
        const submission = await Submission.findByQuery({ formId, parentId }, true)

        if (!submission) {
            throw new Error('No Data Submission found')
        }
        /// /////////////////Mapping/////////////////////
        const mapping = {}

        if (form.fields && Array.isArray(form.fields) && submission.data && typeof submission.data === 'object') {
            form.fields.map((field, index) => {
                const key = `v${index + 1}`
                mapping[key] = submission.data[field.model]
                return key
            })

            /// //////////Layout parsing///////////////

            const layoutModel = require(path.join(process.cwd(), layout.path))
            const parsedHtml = layoutModel(mapping)

            const pdfResponse = await pdfGenerator(parsedHtml)
            const { filename } = pdfResponse

            res.contentType('application/pdf')
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `attachment;filename=${filename}`)
            res.download(filename)
        } else {
            throw new Error('Data inconsistent')
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, print,
}
