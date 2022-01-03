const express = require('express')

const router = express.Router()
const validate = require('../../middlewares/validate')
const printLayoutsController = require('../../controllers/v1/printlayouts')
const chkPermissions = require('../../middlewares/permissions')
const { layoutPermissions } = require('../../permissions')
const { layoutValidations } = require('../../validations')

router.get('/', chkPermissions(layoutPermissions.get), printLayoutsController.all)

router.post('/', chkPermissions(layoutPermissions.create), printLayoutsController.create)

router.post('/print',
    chkPermissions(layoutPermissions.print),
    validate(layoutValidations.print), printLayoutsController.print)

router.get('/:id',
    chkPermissions(layoutPermissions.get), printLayoutsController.show)

router.put('/:id',
    chkPermissions(layoutPermissions.update), printLayoutsController.update)

router.delete('/:id',
    chkPermissions(layoutPermissions.delete), printLayoutsController.destroy)
module.exports = router
