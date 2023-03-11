const express = require('express');
const router = express.Router();
const {
  createExamPaper,
  getAllExamPapers,
  updateExamPaper,
  deleteExamPaper,
  getExamPapersByExamId,
} = require('../../../controllers/Examination/ExamPaper/ExamPaper.controller');

router.post('/', createExamPaper);
router.get('/', getAllExamPapers);
router.put('/:id', updateExamPaper);
router.delete('/:id', deleteExamPaper);
router.post('/:id', getExamPapersByExamId);

module.exports = router;
