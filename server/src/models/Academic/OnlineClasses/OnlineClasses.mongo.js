const { format } = require('date-fns');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const onlineClassesSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },

  startTime: {
    type: Date,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  meetingId: {
    type: String,
    required: true,
  },
  staffId: {
    type: toId,
    ref: 'Staff',
    required: true,
  },
});

module.exports = mongoose.model('OnlineClass', onlineClassesSchema);
