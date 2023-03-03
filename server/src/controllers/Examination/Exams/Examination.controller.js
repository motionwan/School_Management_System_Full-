const Exam = require('../../../models/Examination/Exams/Examination.model');
const ClassSchoolExams = require('../../../models/Examination/ClassSchoolExams/ClassSchoolExams.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createExam = async (req, res) => {
  try {
    const {
      title,
      examCenter,
      startDate,
      endDate,
      classSchoolId,
      sectionId,
      termId,
    } = req.body;
    if (!title || !classSchoolId || !sectionId) {
      return res
        .status(500)
        .json({ error: 'title, classSchoolId, and sectionId are required' });
    }

    const exams = await Exam.create({
      title,
      examCenter,
      startDate,
      endDate,
      classSchoolId,
      sectionId,
      termId,
    });
    const examId = exams._id;
    await ClassSchoolExams.create({ classSchoolId, sectionId, examId, termId });
    return res.json(exams);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((val) => val.message);
      if (
        errors.includes(
          'Cast to ObjectId failed for value "" (type string) at path "classSchoolId" because of "BSONTypeError"'
        )
      ) {
        return res
          .status(500)
          .json({ error: 'class and Course/Program is required' });
      }
    }
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getAllExams = async (req, res) => {
  try {
    return res.json(await Exam.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateExam = async (req, res) => {
  try {
    const { id } = req.params; // exam id;
    const { title, examCenter, startDate, endDate, classSchoolId, sectionId } =
      req.body;
    return res.json(
      await Exam.findByIdAndUpdate(id, {
        title,
        examCenter,
        startDate,
        endDate,
        classSchoolId,
        sectionId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteExam = async (req, res) => {
  try {
    const { id } = req.params; // exam paper id;
    return res.json(await Exam.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createExam,
  getAllExams,
  updateExam,
  deleteExam,
};
