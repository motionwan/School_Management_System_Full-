const express = require('express');
const router = express.Router();

const {
  createExam,
  getAllExams,
  updateExam,
  deleteExam,
} = require('../../../controllers/Examination/Exams/Examination.controller');

router.post('/', createExam);
router.put('/:id', updateExam);
router.get('/', getAllExams);

router.delete('/:id', deleteExam);

module.exports = router;
