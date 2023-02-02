const Routine = require('../../../models/Academic/Routine/Routine.model');

const createRoutine = async (req, res) => {
  try {
    const {
      startTime,
      endTime,
      roomNumber,
      day,
      subjectId,
      sectionId,
      termId,
      createdAt,
      classSchoolId,
    } = req?.body;
    return res.json(
      await Routine.create({
        startTime,
        endTime,
        roomNumber,
        day,
        subjectId,
        sectionId,
        termId,
        createdAt,
        classSchoolId,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateRoutine = async (req, res) => {
  try {
    const { id } = req?.params; // routine id
    const {
      startTime,
      endTime,
      roomNumber,
      day,
      subjectId,
      sectionId,
      staffId,
      termId,
      createdAt,
    } = req.body;
    return res.json(
      await Routine.findByIdAndUpdate(id, {
        startTime,
        endTime,
        roomNumber,
        day,
        subjectId,
        sectionId,
        staffId,
        termId,
        createdAt,
      })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const deleteRoutine = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Routine.findByIdAndDelete(id));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const getAllRoutines = async (req, res) => {
  try {
    return res.json(await Routine.find({}));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// select all the routines of a particular class and section
const getClassSchoolRoutinesWithTermId = async (req, res) => {
  try {
    const { classSchoolId, termId } = req.body; // classSchool id
    console.log(termId);
    console.log(classSchoolId);
    return res.json(
      await Routine.find({ classSchoolId: classSchoolId, termId: termId })
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getAllRoutines,
  getClassSchoolRoutinesWithTermId,
};

// find subjects with class school id.
