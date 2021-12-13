const express = require('express')
const router = express.Router()
const printLayoutController = require('../../controllers/v1/printlayouts')


router.post('/', printLayoutController.printLayout)


module.exports = router
