const { format, parse } = require('date-fns');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const attendanceSchema = new Schema({
  attendanceDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: '',
  },
  studentRecordId: { type: toId, ref: 'StudentRecord' },
  sectionId: { type: toId, ref: 'ClassSection' },
  termId: { type: toId, ref: 'Term' },
  createdAt: {
    type: String,
    default: format(new Date(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model('StudentAttendance', attendanceSchema);
