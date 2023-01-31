const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { format } = require('date-fns');

const schoolSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
    lowercase: true,
  },
  enrollmentPrefix: {
    type: String,
    default: '',
  },
  status: {
    type: Boolean,
    default: true,
  },

  admins: {
    type: Number,
    default: 0,
  },
  lastEnrollmentCount: {
    type: Number,
    default: 0,
  },
  enrollmentPrefix: {
    type: String,
  },
  enrollmentBaseNumber: {
    type: Number,
  },
  enrollmentPadding: {
    type: Number,
    default: 6,
  },
  lastInvoiceCount: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: String,
    default: format(Date.now(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
  settings: {
    type: mongoose.Types.ObjectId,
    ref: 'Settings',
  },
});
module.exports = mongoose.model('School', schoolSchema);
