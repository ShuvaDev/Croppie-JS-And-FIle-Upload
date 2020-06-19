let router = require('express').Router()
let upload = require('../middleware/upload')

router.post('/profilePics', upload.single('profilePics'), (req, res, next) => {
    let profilePics = `/uploads/${req.file.filename}`
    if(req.file) {
        res.status(200).json({
            profilePics
        })
    } else {
        res.status(500).json({
            profilePics
        })
        next(new Error('Upload Failed'))
    }
})


module.exports = router