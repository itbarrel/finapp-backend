const express = require('express')

const router = express.Router()
const rolesController = require('../../controllers/v1/roles')
const validate = require('../../middlewares/validate')
const chkPermissions = require('../../middlewares/permissions')
const { rolePermissions } = require('../../permissions')
const { generalValidations, roleValidations } = require('../../validations')

router.get('/', validate(generalValidations.allResources),
    chkPermissions(rolePermissions.all), rolesController.all)

router.post('/', validate(roleValidations.roleObj),
    chkPermissions(rolePermissions.create), rolesController.create)

router.put('/:id', validate(generalValidations.getResource), validate(roleValidations.roleObj),
    chkPermissions(rolePermissions.update), rolesController.update)

router.delete('/:id', validate(generalValidations.getResource),
    chkPermissions(rolePermissions.delete), rolesController.destroy)

router.get('/permissions', chkPermissions(rolePermissions.all), rolesController.entities)

module.exports = router
