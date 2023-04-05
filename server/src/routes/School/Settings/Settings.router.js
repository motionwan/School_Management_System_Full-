const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/uploads.multer');
const {
  createSettings,
  getAllSetting,
} = require('../../../controllers/School/Settings/Settings.controller');

router.post('/', upload.single('schoolCrest'), createSettings);
router.get('/', getAllSetting);

module.exports = router;
