const express = require('express');
const router = express.Router();

const {
  deleteAttendance,
  getallAttendanceByTermId,
  takeAttendance,
  updateAttendance,
} = require('../../../controllers/Academic/StudentAttendance/StudentAttendance.controller');

router.get('/:id', getallAttendanceByTermId);
router.post('/', takeAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
