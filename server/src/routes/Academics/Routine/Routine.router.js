const express = require('express');
const router = express.Router();

const {
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getAllRoutines,
  getClassSchoolRoutinesWithTermId,
} = require('../../../controllers/Academic/Routine/Routine.controller');

router.post('/', createRoutine);
router.put('/', updateRoutine);
router.delete('/', deleteRoutine);
router.get('/', getAllRoutines);
router.post('/class', getClassSchoolRoutinesWithTermId);

module.exports = router;
