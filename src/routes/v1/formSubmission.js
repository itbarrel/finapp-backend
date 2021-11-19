const express = require('express')

const router = express.Router()
const formSubmissionController = require('../../controllers/v1/formSubmissions')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { formSubmissionPermissions } = require('../../permissions')

const { generalValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(formSubmissionPermissions.all), formSubmissionController.all)

router.post('/',
    chkPermissions(formSubmissionPermissions.create), formSubmissionController.create)

// router.get('/:id', validate(generalValidations.getResource),
//     chkPermissions(formSubmissionPermissions.get), formSubmissionController.show)
router.get('/single',
    chkPermissions(formSubmissionPermissions.get), formSubmissionController.single)

router.put('/:id',
    validate(generalValidations.getResource),
    chkPermissions(formSubmissionPermissions.update), formSubmissionController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(formSubmissionPermissions.delete), formSubmissionController.destroy)

router.post('/complete',
    chkPermissions(formSubmissionPermissions.create), formSubmissionController.complete)

module.exports = router
