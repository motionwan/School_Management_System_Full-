const { format } = require('date-fns');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const studentPermissionSchema = new Schema({
  reason: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isApproved: { type: Boolean },
  schoolId: { type: toId, ref: 'School' },
  studentRecordId: { type: toId, ref: 'StudentRecord' },
  sectionId: { type: toId, ref: 'ClassSection' },
  approvedBy: { type: toId, ref: 'Staff' },
  addedBy: { type: toId, ref: 'Staff' },
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

module.exports = mongoose.model('StudentPermission', studentPermissionSchema);
