const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) =>{
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
var upload = multer({storage: storage});

module.exports = upload;