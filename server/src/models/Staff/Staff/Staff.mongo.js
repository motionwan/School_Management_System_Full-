const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;

const Schema = mongoose.Schema;
const StaffSchema = new Schema({
  fullName: {
    type: String,
    lowercase: true,
  },
  dateOfBirth: {
    type: String,
  },
  photoId: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
  },
  password: {
    type: String,
  },
  bloodGroup: { type: String },
  hometown: {
    type: String,
    lowercase: true,
  },
  city: {
    type: String,
    lowercase: true,
  },
  religion: {
    type: String,
    lowercase: true,
  },
  healthInsurance: {
    type: String,
  },
  schoolId: {
    type: toId,
    ref: 'School',
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
  resetPasswordToken: {
    data: String,
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  address: {
    type: String,
  },
  sectionId: {
    type: toId,
    ref: 'ClassSection',
    required: false,
  },
  emergencyContactName: {
    type: String,
    lowercase: true,
  },
  emergencyContactNumber: {
    type: String,
    lowercase: true,
  },
  emergencyContactAddress: {
    type: String,
    lowercase: true,
  },

  role: {
    type: toId,
    ref: 'Roles',
    required: true,
  },
  //permission: { type: toId, ref: 'Permission' },
  status: { type: Boolean, default: true },
});

module.exports = mongoose.model('Staff', StaffSchema);
