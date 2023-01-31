const Active = require('../../../models/School/ActiveSchool/active.mongo');

//read all active schools
const getActiveSchool = async (req, res) => {
  try {
    return res.json(await Active.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// read active school
const findActiveSchool = async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await Active.findById(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// save active schoolId
const saveActiveSchoolId = async (req, res) => {
  try {
    const active = await Active.updateOne({ name: data.name }, data, {
      upsert: true,
    });
    return res.json(active);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteActiveSchool = async (req, res) => {
  try {
    const id = req.params.id;
    return res.json(await Active.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = {
  findActiveSchool,
  saveActiveSchoolId,
  deleteActiveSchool,
  getActiveSchool,
};
