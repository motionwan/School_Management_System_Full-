const { format } = require('date-fns');
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attachment: { type: String },
  eventDate: { type: String },
  status: { type: Boolean, required: true },

  schoolId: {
    type: toId,
    ref: 'School',
    required: true,
  },
  addedBy: {
    type: toId,
    required: false,
    ref: 'Staff',
  },

  termId: {
    type: toId,
    ref: 'Term',
    required: true,
  },

  createdAt: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
  },
});

module.exports = mongoose.model('Event', EventSchema);
