const express = require('express');
const router = express.Router();
const {
  getPermissions,
} = require('../../../controllers/Staff/Permissions/Permissions');

router.get('/', getPermissions);

module.exports = router;
