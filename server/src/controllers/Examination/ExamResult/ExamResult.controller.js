const ExamResult = require('../../../models/Examination/ExamResult/ExamsResult.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createExamResult = async (req, res) => {
  try {
    const {
      examScore,
      termId,
      classScore,
      studentRecordId,
      examPaperId,
      uploadedBy,
      classSchoolId,
      sectionId,
      examId,
    } = req.body;
    return res.json(
      await ExamResult.updateOne(
        { termId, studentRecordId, examPaperId, examId },
        {
          termId,
          examScore,
          classScore,
          studentRecordId,
          examPaperId,
          uploadedBy,
          examId,
          classSchoolId,
          sectionId,
        },
        { upsert: true }
      )
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getExamResults = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateExamResults = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteExamResult = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getStudentsResult = async (req, res) => {
  try {
    const { id } = req.params; // examId
    const { studentRecordId } = req.body;
    const studentResult = await ExamResult.aggregate([
      {
        $match: {
          examId: ObjectId(id),
          studentRecordId: ObjectId(studentRecordId),
        },
      },
      {
        $lookup: {
          from: 'exampapers',
          localField: 'examPaperId',
          foreignField: '_id',
          as: 'examPaper',
        },
      },
      {
        $unwind: '$examPaper',
      },
      {
        $lookup: {
          from: 'subjects',
          localField: 'examPaper.subjectId',
          foreignField: '_id',
          as: 'subject',
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
          from: 'schools',
          localField: 'classSchool.schoolId',
          foreignField: '_id',
          as: 'school',
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
      {
        $lookup: {
          from: 'studentrecords',
          localField: 'studentRecordId',
          foreignField: '_id',
          as: 'students',
        },
      },
      {
        $lookup: {
          from: 'terms',
          localField: 'termId',
          foreignField: '_id',
          as: 'term',
        },
      },
      {
        $unwind: '$class',
      },
      {
        $unwind: '$subject',
      },
      {
        $unwind: '$school',
      },
      {
        $unwind: '$section',
      },
      {
        $unwind: '$students',
      },
      {
        $unwind: '$term',
      },

      {
        $group: {
          _id: '$studentRecordId',
          results: {
            $push: {
              term: { label: '$term.label' },
              school: {
                schoolName: '$school.label',
                phone: '$school.phone',
                address: '$school.address',
                email: '$school.email',
              },
              class: { label: '$class.label' },
              section: { section: '$section.label' },
              student: {
                fullName: '$students.fullName',
                phone: '$students.phoneNumber',
                guardian: '$students.guardianName',
                photoId: '$students.photoId',
                admissionNumber: '$students.admissionNumber',
              },
              // student: '$students',
              examId: '$examId',
              subject: {
                label: '$subject.label',
                category: '$subject.category',
              },
              classScore: '$classScore',
              examScore: '$examScore',
              // uploadedOn: '$uploadedOn',
            },
          },
        },
      },
    ]);
    return res.json(studentResult);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createExamResult,
  getStudentsResult,
};
