const express = require('express')

const router = express.Router()
const accountTypeController = require('../../controllers/v1/accoutType')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { accountTypePermissions } = require('../../permissions')

const { generalValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(accountTypePermissions.all), accountTypeController.all)

router.post('/',
    chkPermissions(accountTypePermissions.create), accountTypeController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(accountTypePermissions.get), accountTypeController.show)

router.put('/:id',
    validate(generalValidations.getResource),
    chkPermissions(accountTypePermissions.update), accountTypeController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(accountTypePermissions.delete), accountTypeController.destroy)

module.exports = router
