/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// const formLayout = require('../../../../layouts/signUp')
// const { signUplayout } = require('../../../../layouts')
const path = require('path')
const fs = require('fs')
const uploadFilesMiddleware = require('../../../middlewares/uploadLayout')
const storage = require('../../../utils/cl-storage')
const { LayoutService, ExtrenalUserFormSubmissionService } = require('../../../services/resources')
const DynamicFormProxy = require('../../../proxies/dynamicFormProxy')
const config = require('../../../../config')
const pdfGenerator = require('../../../utils/pdfGenerator')
const fileParser = require('../../../utils/fileParser')

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
                const key = `field${index + 1}`
                mapping[key] = submission.data[field.model]
                return key
            })

            // const pages = await layout.getPages()
            /// //////////Layout parsing///////////////

            // console.log('>>>>>>>>>>>>>>>.....', pages[0].path)
            fs.readFile(path.join(process.cwd(), layout.path), 'utf8', async (err, html) => {
                const parsedHtml = fileParser(html, mapping)

                const pdfResponse = await pdfGenerator(parsedHtml)
                const { filename } = pdfResponse

                res.contentType('application/pdf')
                res.setHeader('Content-Type', 'application/pdf')
                res.setHeader('Content-Disposition', `attachment;filename=${filename}`)
                res.download(filename)
            })
        } else {
            throw new Error('Data inconsistent')
        }
    } catch (error) {
        next(error)
    }
}

const create = async (req, res) => {
    try {
        await uploadFilesMiddleware(req, res)

        if (req.files === undefined) {
            return res.status(400).send({ message: 'Please upload a file!' })
        }

        const Layout = new LayoutService()
        console.log(">>>>>", req.files);

        const layoutObj = {
            name: req.body.name,
            formId: req.body.formId,
            path: `/layouts/${req.files.filename}`,
        }

        const findlayout = await Layout.findByQuery({ name: layoutObj.name, formId: layoutObj.formId }, true)
        console.log(">>>>>>>", findlayout);

        if (!findlayout) {
            const layout = await Layout.create(layoutObj)

            req.files.map(file => {
                console.log('>>>>>>>>>>>>>>>>...............', file)
                layout.createPage({
                    path: file.path
                })
            })
            res.status(200).send({
                message: 'Uploaded the file successfully: ',
                layout,
            })
        } else {
            res.status(404).send({
                message: 'This layout against this form is already exist',
            })
        }
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: . ${err}`,
        })
    }
}
const show = async (req, res, next) => {
    try {
        const Layout = new LayoutService()

        const { id } = req.params
        const layout = await Layout.findById(id)

        res.send(layout)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        console.log(",,,,,,,,,,,,,");
        const Layout = new LayoutService()

        const { id } = req.params
        console.log('>>>>>>>>>>>', req.body);
        const layout = await Layout.update(req.body, { id })

        res.send(layout)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const Layout = new LayoutService()

        const { id } = req.params
        await Layout.delete({ id })

        res.send({ message: 'Layout is deleted' })
    } catch (error) {
        next(error)
    }
}
module.exports = {
    all, print, create, show, update, destroy
}
