const Notice = require('../../../models/Academic/Notice/Notice.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createNotice = async (req, res) => {
  try {
    let attachment = '';
    if (req.file) {
      attachment = req.file.path;
    }
    const { topic, description, schoolId, addedBy, termId } = req.body;
    return res.json(
      await Notice.create({
        topic,
        description,
        schoolId,
        addedBy,
        termId,
        attachment,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllNoticesByTermId = async (req, res) => {
  try {
    const { id } = req.params; // term id;
    const notices = await Notice.aggregate([
      {
        $match: { termId: ObjectId(id) },
      },
      {
        $lookup: {
          from: 'staffs',
          localField: 'addedBy',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          topic: 1,
          createdAt: 1,
          staff: '$user.fullName',
        },
      },
    ]);
    return res.json(notices);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params; // notice id;
    const { topic, description, schoolId, addedBy, termId } = req.body;
    return res.json(
      await Notice.findByIdAndUpdate(id, {
        topic,
        description,
        schoolId,
        addedBy,
        termId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params; // notice id;
    return res.json(await Notice.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNotice,
  getAllNoticesByTermId,
  updateNotice,
  deleteNotice,
};
