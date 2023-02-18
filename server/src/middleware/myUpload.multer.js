const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

// Create the upload folder if it doesn't exist
const uploadFolder = './upload';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 300000000 }, // 300MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|mp4|avi|mov/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extName) {
      return cb(null, true);
    }
    cb('Invalid file type');
  },
});

// Schedule a cron job to delete files older than 2 months
cron.schedule('0 0 1 */2 *', () => {
  const twoMonthsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 2); // 2 months in milliseconds
  fs.readdir(uploadFolder, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(uploadFolder, file);
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        if (stats.isFile() && stats.mtime < twoMonthsAgo) {
          fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log(`Deleted ${filePath}`);
          });
        }
      });
    });
  });
});

module.exports = upload;
