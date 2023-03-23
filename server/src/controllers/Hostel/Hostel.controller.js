const Hostel = require('../../models/Hostel/Hostel.mongo');

const createHostel = async (req, res) => {
  try {
    const { hostelName, address, schoolId } = req.body;
    return res.json(await Hostel.create({ hostelName, address, schoolId }));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllHostels = async (req, res) => {
  try {
    return res.json(await Hostel.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateHostel = async (req, res) => {
  try {
    const { id } = req.params; // hostel id
    const { hostelName, type, address, intake, schoolId } = req.body;
    return res.json(
      await Hostel.findByIdAndUpdate(id, {
        hostelName,
        type,
        address,
        intake,
        schoolId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteHostel = async (req, res) => {
  try {
    const { id } = req.params; // hostel id;
    return res.json(await Hostel.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createHostel,
  getAllHostels,
  updateHostel,
  deleteHostel,
};
