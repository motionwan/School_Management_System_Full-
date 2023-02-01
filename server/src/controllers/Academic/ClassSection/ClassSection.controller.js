const Section = require('../../../models/Academic/ClassSection/ClassSection.mongo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// read all sections
const findAllSections = async (req, res) => {
  try {
    return res.json(await Section.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// update a section
const updateSection = async (req, res) => {
  try {
    const id = req.params.id; // class section id
    const { classSchoolId, label } = req.body;
    return res.json(
      await Section.findByIdAndUpdate(id, { classSchoolId, label })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// delete a section
const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    return res.json(await Section.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// find sections with classSchool id
const findSectionWithClassSchoolId = async (req, res) => {
  try {
    const { id } = req.params; // class school id
    return await Section.find({ classSchoolId: id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// create a section and assign it to  class school id
const createClassSection = async (req, res) => {
  try {
    const { classSchoolId, label } = req.body;
    return res.json(await Section.create({ label, classSchoolId }));
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Session Already exists' });
    return res.status(500).json({ error: err.message });
  }
};

const getSectionsForClassSchool = async (req, res) => {
  try {
    const { id } = req.params; //class school id
    return res.json(await Section.find({ classSchoolId: id }));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//get sections for school with number
const getClassAndSectionCountForSchool = async (req, res) => {
  const { id } = req.params; // schoolId
  try {
    const sectionAndCount = await Section.aggregate([
      {
        $lookup: {
          from: 'classschools',
          localField: 'classSchoolId',
          foreignField: '_id',
          as: 'classSchool',
        },
      },
      {
        $unwind: '$classSchool',
      },
      {
        $match: { 'classSchool.schoolId': ObjectId(id) },
      },
      {
        $group: {
          _id: '$classSchool',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'classes',
          localField: '_id.classId',
          foreignField: '_id',
          as: 'class',
        },
      },
      {
        $unwind: '$class',
      },
      {
        $project: {
          'class.label': 1,
          count: 1,
        },
      },
    ]);
    return res.json(sectionAndCount);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  findAllSections,
  deleteSection,
  updateSection,
  findSectionWithClassSchoolId,
  createClassSection,
  getSectionsForClassSchool,
  getClassAndSectionCountForSchool,
};
