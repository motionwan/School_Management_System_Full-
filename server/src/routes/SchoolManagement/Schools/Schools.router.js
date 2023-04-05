const express = require('express');
const upload = require('../../../middleware/uploads.multer');
const router = express.Router();
const {
  getAllSchool,
  createNewSchool,
  deleteSchool,
  updateSchool,
} = require('../../../controllers/SchoolManagement/Schools/Schools.controller');

router.get('/', getAllSchool);
router.post('/', upload.single('schoolCrest'), createNewSchool);
router.delete('/:id', deleteSchool);
router.put('/:id', upload.single('schoolCrest'), updateSchool);

module.exports = router;
