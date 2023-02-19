const { format } = require('date-fns');
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  attachment: {
    type: String,
    default: null,
  },
  submissionDate: String,
  setBy: { type: toId, ref: 'User' },
  termId: { type: toId, ref: 'Session' },
  schoolId: { type: toId, ref: 'School' },
  subjectId: { type: toId, ref: 'Subject' },
  homeworkSectionId: { type: toId, ref: 'HomeworkSection' },
  createdAt: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('Homework', homeworkSchema);
