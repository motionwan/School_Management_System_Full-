const express = require('express');
const router = express.Router();
const {
  createHostel,
  getAllHostels,
  updateHostel,
  deleteHostel,
} = require('../../controllers/Hostel/Hostel.controller');

router.get('/', getAllHostels);
router.post('/', createHostel);
router.put('/:id', updateHostel);
router.delete('/:id', deleteHostel);

module.exports = router;
