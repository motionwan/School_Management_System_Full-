const express = require('express');
const router = express.Router();
const {
  createEvent,
  getAllEventsByTermId,
  updateEvent,
  deleteEvent,
} = require('../../../controllers/Academic/Events/event.controller');
const upload = require('../../../middleware/events');

router.post('/', upload.single('attachment'), createEvent);
router.get('/:id', getAllEventsByTermId);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
