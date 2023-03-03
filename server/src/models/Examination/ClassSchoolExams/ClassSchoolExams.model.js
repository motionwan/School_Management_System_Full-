const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const ClassSchoolExamSchema = new Schema({
  classSchoolId: {
    type: toId,
    ref: 'ClassSchool',
    required: true,
  },
  sectionId: {
    type: toId,
    ref: 'ClassSection',
    required: true,
  },
  examId: {
    type: toId,
    ref: 'Exam',
    required: true,
  },
  termId: {
    type: toId,
    ref: 'Term',
    required: true,
  },
});

module.exports = mongoose.model('ClassSchoolExam', ClassSchoolExamSchema);
