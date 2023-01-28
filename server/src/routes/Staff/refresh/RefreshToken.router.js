const express = require('express');
const router = express.Router();
const handleRefreshToken = require('../../../controllers/Staff/refresh/RefreshToken.controller');

router.get('/', handleRefreshToken);

module.exports = router;
