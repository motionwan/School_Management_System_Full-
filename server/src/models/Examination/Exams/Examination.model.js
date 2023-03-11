const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  examCenter: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  classSchoolId: {
    type: toId,
    ref: 'ClassSchool',
  },
  sectionId: {
    type: toId,
    ref: 'ClassSection',
  },
  termId: {
    type: toId,
    ref: 'Term',
    required: true,
  },
});

module.exports = mongoose.model('Exam', ExamSchema);
