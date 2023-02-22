const { format } = require('date-fns');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const studentSchema = new Schema({
  admissionNumber: {
    type: String,
  },
  fullName: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  admissionDate: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  guardianName: {
    type: String,
  },
  guardianPhoneNumber: {
    type: String,
  },
  guardianOccupation: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  photoId: {
    // deal with this when photo database is ready
    type: String,
  },
  resetPasswordToken: {
    type: String,
    default: '',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  sectionId: { type: toId, ref: 'ClassSection' },
  termId: { type: toId, ref: 'Term' },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,

    default: format(new Date(), 'do-MMM-yyyy'),
  },
  updatedAt: {
    type: String,
    default: null,
  },
  city: { type: String },
  healthInsurance: { type: String },
  hometown: { type: String },
  religion: { type: String },
  allergies: String,
  // motherPhoneNumber: {

  // motherName: {
  //   type: String,
  // },
  //   type: String,
  // },
  // motherOccupation: {
  //   type: String,
  // },
});

module.exports = mongoose.model('StudentRecord', studentSchema);
