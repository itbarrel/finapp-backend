const pdf = require('html-pdf');
const html = require('../../../../layouts/signUp')({ v1: 'Saad' })
// const pdfforms = require('../../../pdfForms')
const options = {
    format: 'Letter'
}

pdf.create(html, options).toFile('./../../pdfForms/output.pdf', (err, res) => {
    if (err) {
        console.log(err);
    }
});
