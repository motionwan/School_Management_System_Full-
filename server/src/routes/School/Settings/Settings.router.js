const express = require('express');
const router = express.Router();
const {
  createSettings,
  getAllSetting,
} = require('../../../controllers/School/Settings/Settings.controller');

router.post('/', createSettings);
router.get('/', getAllSetting);

module.exports = router;
