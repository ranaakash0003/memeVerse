const fs = require('fs')

module.exports = (req, res, next) => {
    if (typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
        return res.status(400).json({
            errors: 'problem with sending data'
        })
    }
    // console.log(req.body.name)
    let image = req.file.path

    // console.log(req.file)

    if (!(req.file.mimetype).includes('jpeg') && 
        !(req.file.mimetype).includes('png') && 
        !(req.file.mimetype).includes('jpg') && 
        !(req.file.mimetype).includes('gif')) {
        fs.unlinkSync(req.file.path)

        return res.status(400).send({ success: false,
            message: "File does not supported"
        })
    }

    if (req.file.size > 1024 * 1024) {
        fs.unlinkSync(req.file.path)
        return res.status(400).send({ success: false,
            message: "File is Too large"
        })
    }
    // console.log(req.file)

    if (!image) {
        return res.status(400).send({
            sucess: false,
            message: "Image is required"
        })
    }

    next()
}