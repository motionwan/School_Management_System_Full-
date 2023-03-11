// const mongoose = require('mongoose');
// const toId = mongoose.Types.ObjectId;
// const Schema = mongoose.Schema;

// const roleSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   permissions: [
//     {
//       type: toId,
//       ref: 'Permission',
//     },
//   ],
// });
//module.exports = mongoose.model('Roles', roleSchema);
const mongoose = require('mongoose');
const toId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Roles', roleSchema);
