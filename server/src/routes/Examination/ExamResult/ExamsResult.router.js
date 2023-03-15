const express = require('express');
const router = express.Router();
const {
  createExamResult,
  getStudentsResult,
} = require('../../../controllers/Examination/ExamResult/ExamResult.controller');

router.post('/', createExamResult);
router.post('/student_result/:id', getStudentsResult);

module.exports = router;
