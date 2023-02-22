const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/uploads.multer');

const {
  admitStudent,
  updateStudent,
  getAllStudents,
  deleteStudent,
  searchStudents,
  getStudentBySectionAndTermId,
} = require('../../../controllers/Students/StudentRecord/StudentRecord.controller');

router.post('/', upload.single('photoId'), admitStudent);
router.put('/:id', updateStudent);
router.get('/:id', getAllStudents);
router.post('/section/:id', getStudentBySectionAndTermId);
router.delete('/:id', deleteStudent);
router.post('/search', searchStudents);

module.exports = router;
