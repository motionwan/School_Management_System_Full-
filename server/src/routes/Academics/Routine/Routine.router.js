const express = require('express');
const router = express.Router();

const {
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getAllRoutines,
  getClassSchoolRoutinesWithTermId,
  groupRoutineByClassSchoolId,
  deleteAllRoutinesBySectionId,
} = require('../../../controllers/Academic/Routine/Routine.controller');

router.post('/', createRoutine);
router.put('/', updateRoutine);
router.delete('/', deleteRoutine);
router.get('/', getAllRoutines);
router.post('/class', getClassSchoolRoutinesWithTermId);
router.get('/group/:id', groupRoutineByClassSchoolId);
router.get('/:id', deleteAllRoutinesBySectionId);

module.exports = router;
