const Permission = require('../../../models/Staff/Permission.model');
const data = require('../../../../data/Permissions');

const getPermissions = async (req, res) => {
  try {
    return res.json(await Permission.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// const createPermissions = async (req, res) => {
//   data.forEach(async (permission) => {
//     await Permission.create(permission)
//       .then((createdPermission) => {
//         console.log(`Permission created: ${createdPermission}`);
//       })
//       .catch((error) => {
//         console.error(`Error creating permission: ${error}`);
//       });
//   });
// };

// createPermissions();

module.exports = { getPermissions };
