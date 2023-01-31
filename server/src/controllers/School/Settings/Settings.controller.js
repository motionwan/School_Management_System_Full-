const Settings = require('../../../models/School/Settings/settings.mongo');

const createSettings = async (req, res) => {
  try {
    const { currentTermId, bmb } = req.body;

    const setting = await Settings.updateOne(
      { bmb: bmb },
      { currentTermId },
      { upsert: true }
    );
    return res.json(setting);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

const getAllSetting = async (req, res) => {
  try {
    const allSettings = await Settings.find({}).populate('currentTermId');
    return res.json(allSettings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createSettings, getAllSetting };
