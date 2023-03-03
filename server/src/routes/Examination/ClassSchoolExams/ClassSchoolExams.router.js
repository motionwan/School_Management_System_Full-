const express = require('express');
const router = express.Router();
const {
  getAllExamsDetails,
} = require('../../../controllers/Examination/ClassSchoolExams/ClassSchoolExams.controller');

router.get('/:id', getAllExamsDetails);

module.exports = router;
