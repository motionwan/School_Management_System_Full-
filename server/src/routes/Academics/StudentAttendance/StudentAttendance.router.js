const express = require('express');
const router = express.Router();

const {
  deleteAttendance,
  getallAttendanceByTermId,
  takeAttendance,
  updateAttendance,
  getMonthlyAttendance,
} = require('../../../controllers/Academic/StudentAttendance/StudentAttendance.controller');

router.get('/', getallAttendanceByTermId);
router.post('/', takeAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);
router.post('/monthly', getMonthlyAttendance);

module.exports = router;
