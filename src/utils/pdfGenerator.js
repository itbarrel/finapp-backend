const uuid = require('uuid')

const path = require('path')
const pdf = require('html-pdf')

const options = {
    format: 'Letter',
}

module.exports = (html, filePath) => {
    const outputPath = filePath || path.join(process.cwd(), `/pdfOutputs/${uuid.v4()}.pdf`)
    return new Promise((resolve, reject) => {
        pdf.create(html, options).toFile(outputPath, (err, response) => {
            if (err) {
                reject(err)
            }
            resolve(response)
        })
    })
}
