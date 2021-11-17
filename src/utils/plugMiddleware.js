const nonMiddleFunctions = [
    'constructor', 'before', 'after',
]
const plugMiddleware = (entity, before, after) => {
    const keys = Object.getOwnPropertyNames(entity.prototype)
    keys.forEach((key) => {
        if (nonMiddleFunctions.includes(key)) return
        const old = entity.prototype[key]
        entity.prototype[key] = async (...args) => {
            await before(...args)
            await old.call(this, ...args)
            await after(...args)
        }
    })
}
module.exports = plugMiddleware
