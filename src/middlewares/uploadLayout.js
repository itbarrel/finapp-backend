import { v4 as uuidv4 } from 'uuid'

const util = require('util')
const multer = require('multer')
const path = require('path')

const maxSize = 2 * 1024 * 1024

// const uuid = '8797'
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /html/
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    // Check mime
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return
    }
    cb('Error: html Only!')
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), '/layouts/'))
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`)
        checkFileType(file, cb)

    },

})

const uploadFile = multer({ storage }).array("files", 10)

const uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware
