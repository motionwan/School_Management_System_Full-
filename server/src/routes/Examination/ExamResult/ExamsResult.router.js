const express = require('express');
const router = express.Router();
const {
  createExamResult,
} = require('../../../controllers/Examination/ExamResult/ExamResult.controller');

router.post('/', createExamResult);

module.exports = router;
