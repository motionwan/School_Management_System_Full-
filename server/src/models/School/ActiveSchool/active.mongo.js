const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activeSchoolSchema = new Schema({
  label: String,
  name: String,
});

module.exports = mongoose.model('Active', activeSchoolSchema);
