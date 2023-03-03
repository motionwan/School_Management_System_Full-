const ClassSchoolExams = require('../../../models/Examination/ClassSchoolExams/ClassSchoolExams.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// get all exams, class and section information for display
const getAllExamsDetails = async (req, res) => {
  const { id } = req.params; // term id;
  try {
    const examDetails = await ClassSchoolExams.aggregate([
      {
        $match: { termId: ObjectId(id) },
      },
      {
        $lookup: {
          from: 'exams',
          localField: 'examId',
          foreignField: '_id',
          as: 'exams',
        },
      },
      {
        $lookup: {
          from: 'classschools',
          localField: 'classSchoolId',
          foreignField: '_id',
          as: 'classSchool',
        },
      },
      {
        $lookup: {
          from: 'classes',
          localField: 'classSchool.classId',
          foreignField: '_id',
          as: 'class',
        },
      },
      {
        $lookup: {
          from: 'classsections',
          localField: 'sectionId',
          foreignField: '_id',
          as: 'section',
        },
      },

      { $unwind: '$class' },
      { $unwind: '$classSchool' },
      { $unwind: '$section' },
      { $unwind: '$exams' },
      {
        $project: {
          class: '$class.label',
          section: '$section.label',
          examCenter: '$exams.examCenter',
          startDate: '$exams.startDate',
          endDate: '$exams.endDate',
        },
      },
    ]);
    return res.json(examDetails);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllExamsDetails,
};
