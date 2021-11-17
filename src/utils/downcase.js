const downcase = (str = '') => str.replace(/[^A-Z0-9]/ig, '_')

module.exports = downcase
