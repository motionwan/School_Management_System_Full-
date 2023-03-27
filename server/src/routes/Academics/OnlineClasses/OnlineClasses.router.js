const express = require('express');
const router = express.Router();

const {
  createZoomClass,
} = require('../../../controllers/Academic/OnlineClasses/OnlineClasses.controller');

router.post('/', createZoomClass);

module.exports = router;
