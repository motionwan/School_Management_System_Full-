const StudentPermission = require('../../../models/Academic/Exeat/Exeat.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createNewPermission = async (req, res) => {
  try {
    const {
      reason,
      startDate,
      endDate,
      isApproved,
      schoolId,
      studentRecordId,
      sectionId,
      approvedBy,
      addedBy,
      termId,
    } = req.body;
    return res.json(
      await StudentPermission.create({
        reason,
        startDate,
        endDate,
        isApproved,
        schoolId,
        studentRecordId,
        sectionId,
        approvedBy,
        addedBy,
        termId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateStudentPermission = async (req, res) => {
  try {
    const { id } = req.params; // student permission id;
    const {
      reason,
      startDate,
      endDate,
      isApproved,
      schoolId,
      studentRecordId,
      sectionId,
      approvedBy,
      addedBy,
      termId,
    } = req.body;
    return res.json(
      await StudentPermission.findByIdAndUpdate(id, {
        reason,
        startDate,
        endDate,
        isApproved,
        schoolId,
        studentRecordId,
        sectionId,
        approvedBy,
        addedBy,
        termId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteStudentPermission = async (req, res) => {
  try {
    const { id } = req.params; // student permission id;
    return res.json(await StudentPermission.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getStudentPermission = async (req, res) => {
  try {
    return res.json(
      await StudentPermission.find({})
        .populate('studentRecordId')
        .populate('sectionId', 'label')
        .populate('schoolId', 'classId')
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllExeatsForTheTerm = async (req, res) => {
  try {
    const { id } = req.params; // term id;
    const termExeats = await StudentPermission.aggregate([
      {
        $match: {
          termId: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'studentrecords',
          localField: 'studentRecordId',
          foreignField: '_id',
          as: 'studentRecord',
        },
      },
      {
        $unwind: '$studentRecord',
      },
      {
        $lookup: {
          from: 'classsections',
          localField: 'studentRecord.sectionId',
          foreignField: '_id',
          as: 'section',
        },
      },
      {
        $unwind: '$section',
      },
      {
        $lookup: {
          from: 'classschools',
          localField: 'section.classSchoolId',
          foreignField: '_id',
          as: 'classSchools',
        },
      },
      {
        $unwind: '$classSchools',
      },
      {
        $lookup: {
          from: 'classes',
          localField: 'classSchools.classId',
          foreignField: '_id',
          as: 'class',
        },
      },
      {
        $unwind: '$class',
      },
      {
        $project: {
          _id: 1,
          reason: 1,
          studentName: '$studentRecord.fullName',
          admissionNumber: '$studentRecord.admissionNumber',
          class: '$class.label',
          section: '$section.label',
          startDate: 1,
          endDate: 1,
          isApproved: 1,
        },
      },
    ]);
    return res.json(termExeats);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNewPermission,
  updateStudentPermission,
  deleteStudentPermission,
  getStudentPermission,
  getAllExeatsForTheTerm,
};
