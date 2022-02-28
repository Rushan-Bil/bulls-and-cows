const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/img/');
  },

  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});
console.log('MULTER WORK+++++++++++++++++++');
const upload = multer({ storage });

module.exports = upload;
