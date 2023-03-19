const { format } = require('date-fns');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const hostelSchema = new Schema({
  hostelName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  address: {
    type: String,
  },
  intake: {
    type: Number,
  },
  schoolId: {
    type: toId,
    ref: 'School',
  },
});

module.exports = mongoose.model('Hostel', hostelSchema);
