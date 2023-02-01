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
} = require('../../../controllers/Academic/ClassSection/ClassSection.controller');

router.get('/', findAllSections);
router.post('/', createClassSection);
router.delete('/:id', deleteSection);
router.put('/:id', updateSection);
router.get('/:id', getSectionsForClassSchool);
router.get('/count/:id', getClassAndSectionCountForSchool);

module.exports = router;
