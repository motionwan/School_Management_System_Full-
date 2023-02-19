const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create the upload folder if it doesn't exist
const homeworkFolder = './homework';
if (!fs.existsSync(homeworkFolder)) {
  fs.mkdirSync(homeworkFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, homeworkFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 9000000 }, // 9MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extName) {
      return cb(null, true);
    }
    cb('Invalid file type');
  },
});

module.exports = upload;
