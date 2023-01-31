const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toId = mongoose.Types.ObjectId;

const settingsSchema = new Schema({
  currentTermId: {
    type: toId,
    ref: 'Terms',
    required: true,
  },
  bmb: { type: Number, required: true },
});
module.exports = mongoose.model('Setting', settingsSchema);
