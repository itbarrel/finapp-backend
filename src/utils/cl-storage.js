const { createNamespace, getNamespace } = require('cls-hooked')

createNamespace('crisishub')
const storage = getNamespace('crisishub')
storage.run(() => { })

module.exports = storage
