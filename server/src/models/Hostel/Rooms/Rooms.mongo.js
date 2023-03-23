const { format } = require('date-fns');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const roomSchema = new Schema({
  roomName: {
    type: String,
    required: true,
  },

  numberOfBeds: {
    type: Number,
  },
  hostelId: {
    type: toId,
    ref: 'Hostel',
  },
});

module.exports = mongoose.model('Room', roomSchema);
