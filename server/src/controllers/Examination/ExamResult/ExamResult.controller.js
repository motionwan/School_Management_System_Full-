const ExamResult = require('../../../models/Examination/ExamResult/ExamsResult.model');

const createExamResult = async (req, res) => {
  try {
    const {
      examScore,
      termId,
      classScore,
      studentRecordId,
      examPaperId,
      uploadedBy,
    } = req.body;
    return res.json(
      await ExamResult.updateOne(
        { termId, studentRecordId, examPaperId },
        {
          termId,
          examScore,
          classScore,
          studentRecordId,
          examPaperId,
          uploadedBy,
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

module.exports = {
  createExamResult,
};
