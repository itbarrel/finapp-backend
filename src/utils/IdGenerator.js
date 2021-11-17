const IDGenerator = (n = 10, prefix) => ((prefix)
    ? `${prefix}_${[...Array(n)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
    : [...Array(n)].map(() => Math.floor(Math.random() * 16).toString(16)).join(''))

module.exports = IDGenerator
