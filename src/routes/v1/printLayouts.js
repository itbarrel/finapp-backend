const express = require('express')

const router = express.Router()
const validate = require('../../middlewares/validate')
const printLayoutsController = require('../../controllers/v1/printlayouts')
// const { layoutPermissions } = require('../../permissions')
const { layoutValidations } = require('../../validations')

router.get('/', printLayoutsController.all)
router.post('/', printLayoutsController.create)
router.post('/print', validate(layoutValidations.print), printLayoutsController.print)

module.exports = router
