const express = require('express')

const router = express.Router()
const usersController = require('../../controllers/v1/users')
const chkPermissions = require('../../middlewares/permissions')
const validate = require('../../middlewares/validate')
const { userPermissions } = require('../../permissions')
const { generalValidations, userValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(userPermissions.all), usersController.all)

router.post('/', validate(userValidations.useroObj),
    chkPermissions(userPermissions.create), usersController.create)

router.get('/:id', validate(generalValidations.getResource),
    chkPermissions(userPermissions.get), usersController.show)

router.put('/:id',
    validate(generalValidations.getResource), validate(userValidations.useroObj),
    chkPermissions(userPermissions.update), usersController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(userPermissions.delete), usersController.destroy)

module.exports = router
