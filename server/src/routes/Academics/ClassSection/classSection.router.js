const express = require('express');
const router = express.Router();
const {
  findAllSections,
  deleteSection,
  updateSection,
  findSectionWithClassSchoolId,
  createClassSection,
  getSectionsForClassSchool,
  getClassAndSectionCountForSchool,
  //findSectionWithClassSchoolId,
} = require('../../../controllers/Academic/ClassSection/ClassSection.controller');

router.get('/', findAllSections);
router.post('/', createClassSection);
router.delete('/:id', deleteSection);
router.put('/:id', updateSection);
router.get('/:id', getSectionsForClassSchool);
router.get('/count/:id', getClassAndSectionCountForSchool);
//router.get('/class/:id', findSectionWithClassSchoolId);

module.exports = router;
