const express = require('express');
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
} = require('../../../controllers/Hostel/Rooms/Rooms.controller');

router.get('/', getAllRooms);
router.post('/', createRoom);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

module.exports = router;
