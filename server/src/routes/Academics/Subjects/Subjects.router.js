const express = require('express');
const router = express.Router();

const {
  httpCreateSubjects,
  httpFindAllSubjects,
  httpUpdateSubject,
  httpDeleteSubject,
  httpFindClassSubjects,
  findSectionSubject,
} = require('../../../controllers/Academic/Subjects/Subject.controller');

router.post('/', httpCreateSubjects);
router.get('/', httpFindAllSubjects);
router.get('/class/:id', httpFindClassSubjects);
router.get('/section/:id', findSectionSubject);
router.put('/:id', httpUpdateSubject);
router.delete('/:id', httpDeleteSubject);

module.exports = router;
