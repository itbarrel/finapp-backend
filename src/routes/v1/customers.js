const express = require('express')

const router = express.Router()
const customersController = require('../../controllers/v1/users')

router.post('/', customersController.createCustomer)

module.exports = router
