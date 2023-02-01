const express = require('express');
const router = express.Router();

const {
  createClassSchool,
  findAllClassSchool,
  deleteClassSchool,
  findClass,
  getUniqueClass,
  updateClassSchool,
  findAssignedClassWithSchoolId,
  countSections,
} = require('../../../controllers/Academic/ClassSchool/ClassSchool.controller');

router.post('/', createClassSchool);
router.get('/', findAllClassSchool);
router.delete('/:id', deleteClassSchool);
router.put('/:id', updateClassSchool);
router.get('/classes/:id', findClass);
router.get('/class/:id', getUniqueClass);
router.get('/school/class/:id', findAssignedClassWithSchoolId);
router.get('/count/:id', countSections);

module.exports = router;
