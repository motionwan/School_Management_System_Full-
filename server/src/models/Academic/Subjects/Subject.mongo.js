const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;
const { format } = require('date-fns');

const subjectSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  code: { type: String, required: true },
  type: { type: String, required: true },
  classSchoolId: { type: toId, ref: 'ClassSchool' },
  sectionId: { type: toId, ref: 'ClassSection', required: true },
  teacherId: { type: toId, ref: 'Staff' },
  createdAt: {
    type: String,
    required: true,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: { type: String, default: null },
});

module.exports = mongoose.model('Subject', subjectSchema);
