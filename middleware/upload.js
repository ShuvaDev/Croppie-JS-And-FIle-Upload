let multer = require('multer')
let path = require('path')
const { type } = require('os')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
})

let upload = multer({
    storage,
    limits: {
        fileSize: 1000 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        let types = /jpeg|jpg|png|gif/
        let extname = types.test(path.extname(file.originalname).toLowerCase())
        let mimetypes = types.test(file.mimetype)

        if(extname && mimetypes) {
            cb(null, true)
        } else {
            cb(new Error('You can upload only jpeg, jpg, png and gif format file.'))
        }
    }
})

module.exports = upload