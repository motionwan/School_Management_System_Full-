const { format } = require('date-fns');
const mongoose = require('mongoose');

const toId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attachment: { type: String },

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
  isActive: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model('Notice', NoticeSchema);
