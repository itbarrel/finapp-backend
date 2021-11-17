const verifyPermission = require('../utils/verifyPermission')
const storage = require('../utils/cl-storage')

module.exports = (permissionsToChk) => async (req, res, next) => {
    const role = storage.get('role')
    let granted = false

    if (permissionsToChk && permissionsToChk.length > 0) {
        granted = verifyPermission(role, permissionsToChk)
        if (granted) next()
        else return res.status(403).send({ message: 'Premission not granted' })
    } else return res.status(403).send({ message: 'Premission not granted' })
}
