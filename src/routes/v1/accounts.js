const express = require('express')

const router = express.Router()
const accountsController = require('../../controllers/v1/accounts')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { accountPermissions } = require('../../permissions')

const { generalValidations, accountValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources), chkPermissions(accountPermissions.all), accountsController.all)

router.post('/', validate(accountValidations.accountObj),
    chkPermissions(accountPermissions.create), accountsController.create)

router.get('/:id', validate(generalValidations.getResource), chkPermissions(accountPermissions.get), accountsController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(accountValidations.accountObj),
    chkPermissions(accountPermissions.update), accountsController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(accountPermissions.delete), accountsController.destroy)

module.exports = router
