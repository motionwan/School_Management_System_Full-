const { parseISO } = require('date-fns');
const ExamPaper = require('../../../models/Examination/ExamPapers/ExamPaper.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createExamPaper = async (req, res) => {
  try {
    const {
      subjectId,
      maximumMarks,
      paperDate,
      startTime,
      endTime,
      roomNumber,
      examId,
      termId,
    } = req.body;
    const parsedDate = parseISO(paperDate);

    return res.json(
      await ExamPaper.create({
        subjectId,
        maximumMarks,
        paperDate: parsedDate,
        startTime,
        endTime,
        roomNumber,
        examId,
        termId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAllExamPapers = async (req, res) => {
  try {
    return res.json(await ExamPaper.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateExamPaper = async (req, res) => {
  try {
    const { id } = req.params; // exam paper id;
    const {
      subjectId,
      maximumMarks,
      paperDate,
      startTime,
      endTime,
      roomNumber,
      examId,
      termId,
    } = req.body;
    return res.json(
      await ExamPaper.findByIdAndUpdate(id, {
        subjectId,
        maximumMarks,
        paperDate,
        startTime,
        endTime,
        roomNumber,
        examId,
        termId,
      })
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const deleteExamPaper = async (req, res) => {
  try {
    const { id } = req.params; // exam paper id;
    return res.json(await ExamPaper.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getExamPapersByExamId = async (req, res) => {
  try {
    const { id } = req.params; //exams id;
    const { teacherId } = req.body;
    const examPaper = await ExamPaper.aggregate([
      { $match: { examId: ObjectId(id) } },
      {
        $lookup: {
          from: 'subjects',
          localField: 'subjectId',
          foreignField: '_id',
          as: 'subject',
        },
      },
      // match subject id with teacher id
      { $match: { 'subject.teacherId': ObjectId(teacherId) } }, // only return the teachers subjects
      { $unwind: '$subject' },
      { $project: { _id: 1, label: '$subject.label' } },
    ]);
    return res.json(examPaper);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createExamPaper,
  getAllExamPapers,
  updateExamPaper,
  deleteExamPaper,
  getExamPapersByExamId,
};
