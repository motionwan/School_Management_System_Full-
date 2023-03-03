const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const ExamPaperSchema = new Schema({
  subjectId: {
    type: toId,
    ref: 'Subject',
    unique: true,
  },
  maximumMarks: {
    type: Number,
  },
  paperDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  roomNumber: {
    type: String,
  },
  examId: {
    type: toId,
    ref: 'Exam',
  },
  termId: {
    type: toId,
    ref: 'Term',
    required: true,
  },
});

module.exports = mongoose.model('ExamPaper', ExamPaperSchema);
