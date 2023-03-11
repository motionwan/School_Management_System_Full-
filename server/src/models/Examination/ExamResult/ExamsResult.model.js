const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;
const { format } = require('date-fns');

const examResultSchema = new Schema({
  examScore: {
    type: Number,
    required: true,
    default: 0,
  },
  classScore: {
    type: Number,
    max: 30,
    required: true,
    default: 0,
  },
  studentRecordId: {
    type: toId,
    ref: 'StudentRecord',
  },
  examPaperId: {
    type: toId,
    ref: 'ExamPaper',
  },
  // answerKey: { type: String },
  uploadedBy: {
    type: toId,
    required: true,
    ref: 'Staff',
  },
  termId: {
    type: toId,
    ref: 'Term',
    required: true,
  },
  uploadedOn: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedOn: {
    type: String,
  },
});

module.exports = mongoose.model('ExamResult', examResultSchema);
