const { Parser } = require('simple-text-parser')

const parser = new Parser()

module.exports = (html = '', params = {}) => {
    parser.addRule(/\$[\S]+}/gi, (tag) => {
        const parsedTag = tag.substring(2, (tag.length - 1))
        // Return the tag minus the `#` and surrond with html tags
        return `${params[parsedTag] || ''}`
    })
    return parser.render(html)
}
