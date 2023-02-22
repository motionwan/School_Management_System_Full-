const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;
const StaffSchema = new Schema({
  fullName: {
    type: String,
    default: null,
  },
  dateOfBirth: {
    type: String,
    default: null,
  },
  photoId: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    default: '',
  },
  bloodGroup: { type: String, default: '' },
  hometown: { type: String, default: '' },
  city: { type: String, default: '' },
  religion: { type: String, default: '' },
  healthInsurance: { type: String, default: '' },
  schoolId: {
    type: toId,
    ref: 'School',
  },
  phoneNumber: {
    type: String,
    unique: true,
    default: '',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
    default: '',
  },
  resetPasswordToken: {
    data: String,
    default: '',
  },
  username: {
    type: String,
    unique: true,
    default: '',
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  sectionId: {
    type: toId,
    ref: 'ClassSection',
    required: false,
  },
  emergencyContactName: { type: String, default: '' },
  emergencyContactNumber: { type: String, default: '' },
  emergencyContactAddress: { type: String, default: '' },

  role: {
    type: toId,
    ref: 'Roles',
    required: true,
  },
  //permission: { type: toId, ref: 'Permission' },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model('Staff', StaffSchema);
