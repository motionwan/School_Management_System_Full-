const express = require('express');
const router = express.Router();

const {
  createNewPermission,
  updateStudentPermission,
  deleteStudentPermission,
  getStudentPermission,
  getAllExeatsForTheTerm,
} = require('../../../controllers/Academic/Exeat/Exeat.controller');

router.post('/', createNewPermission);
router.put('/:id', updateStudentPermission);
router.delete('/:id', deleteStudentPermission);
router.get('/', getStudentPermission);
router.get('/:id', getAllExeatsForTheTerm);

module.exports = router;
