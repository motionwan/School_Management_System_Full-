const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/checkPermission/Homework');

const {
  createHomeworkSection,
  getAllHomeworkSection,
  updateHomeworkSection,
  deleteHomeworkSection,
  getAllHomeworkSectionByTermId,
} = require('../../../controllers/Academic/HomeworkSection/HomeworkSection.controller');

router.post('/', upload.single('attachment'), createHomeworkSection);
router.get('/', getAllHomeworkSection);
router.put('/:id', updateHomeworkSection);
router.delete('/:id', deleteHomeworkSection);
router.get('/:id', getAllHomeworkSectionByTermId);

module.exports = router;
