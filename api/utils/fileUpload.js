const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 4000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|webp|gif|hiec/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Error: Images only!')
  }
}

module.exports = upload
