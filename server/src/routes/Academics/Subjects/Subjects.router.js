const express = require('express');
const router = express.Router();

const {
  httpCreateSubjects,
  httpFindAllSubjects,
  httpUpdateSubject,
  httpDeleteSubject,
  httpFindClassSubjects,
} = require('../../../controllers/Academic/Subjects/Subject.controller');

router.post('/', httpCreateSubjects);
router.get('/', httpFindAllSubjects);
router.get('/class/:id', httpFindClassSubjects);
router.put('/:id', httpUpdateSubject);
router.delete('/:id', httpDeleteSubject);

module.exports = router;
