const { format } = require('date-fns');
const mongoose = require('mongoose');

const toId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;

const RoutineRouter = new Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
  },
  day: {
    type: Number,
    required: true,
  },
  subjectId: {
    type: toId,
    ref: 'Subject',
    required: true,
  },
  sectionId: {
    type: toId,
    ref: 'ClassSection',
    required: true,
  },
  staffId: {
    type: toId,
    required: false,
    ref: 'User',
  },
  classSchoolId: {
    type: toId,
    ref: 'ClassSchool',
    required: true,
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

module.exports = mongoose.model('Routine', RoutineRouter);
