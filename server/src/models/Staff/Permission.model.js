// Permission model schema

const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  resources: [{ type: String, required: true }],
});

module.exports = mongoose.model('Permission', permissionSchema);
