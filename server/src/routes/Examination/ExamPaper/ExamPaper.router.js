const express = require('express');
const router = express.Router();
const {
  createExamPaper,
  getAllExamPapers,
  updateExamPaper,
  deleteExamPaper,
  getExamPapersByExamId,
  adminGetExamPapersByExamId,
} = require('../../../controllers/Examination/ExamPaper/ExamPaper.controller');

router.post('/', createExamPaper);
router.get('/', getAllExamPapers);
router.put('/:id', updateExamPaper);
router.delete('/:id', deleteExamPaper);
router.get('/staff/:id', getExamPapersByExamId);
router.get('/admin/:id', adminGetExamPapersByExamId);

module.exports = router;
