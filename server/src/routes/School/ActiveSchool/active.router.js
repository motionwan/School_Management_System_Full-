const express = require('express');
const {
  findActiveSchool,
  saveActiveSchoolId,
  deleteActiveSchool,
  getActiveSchool,
} = require('../../../controllers/School/ActiveSchool/active.controller');

const router = express.Router();

router.get('/', getActiveSchool);
router.get('/:id', findActiveSchool);
router.post('/', saveActiveSchoolId);
router.delete('/:id', deleteActiveSchool);

module.exports = router;
