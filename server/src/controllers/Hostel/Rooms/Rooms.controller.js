const Room = require('../../../models/Hostel/Rooms/Rooms.mongo');

const createRoom = async (req, res) => {
  try {
    const { roomName, numberOfBeds, hostelId } = req.body;
    return res.json(await Room.create({ roomName, numberOfBeds, hostelId }));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    return res.json(await Room.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { id } = req.params; // room id
    const { roomName, numberOfBeds, hostelId } = req.body;
    return res.json(
      await Room.findByIdAndUpdate(id, { roomName, numberOfBeds, hostelId })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Room.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};
