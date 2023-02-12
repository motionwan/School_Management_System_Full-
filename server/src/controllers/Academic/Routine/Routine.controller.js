const Routine = require('../../../models/Academic/Routine/Routine.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
    return res.json(await Routine.find({}).populate('subjectId'));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// select all the routines of a particular class and section
const getClassSchoolRoutinesWithTermId = async (req, res) => {
  try {
    const { sectionId, termId } = req.body; // classSchool id
    return res.json(
      await Routine.find({ sectionId: sectionId, termId: termId }).populate(
        'subjectId'
      )
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const groupRoutineByClassSchoolId = async (req, res) => {
  try {
    const id = req.params.id;
    const groupedRoutine = await Routine.aggregate([
      { $match: { termId: ObjectId(id) } },
      {
        $group: {
          _id: {
            termId: ObjectId(id),
            sectionId: '$sectionId',
          },
          classSchoolIds: {
            $push: '$classSchoolId',
          },
        },
      },
      {
        $lookup: {
          from: 'classschools',
          localField: 'classSchoolIds',
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
        $group: {
          _id: '$_id.sectionId',
          termId: {
            $first: '$_id.termId',
          },
          classLabel: {
            $first: '$class.label',
          },
          classSchoolId: {
            $first: '$classSchools._id',
          },
        },
      },
      {
        $lookup: {
          from: 'classsections',
          localField: '_id',
          foreignField: '_id',
          as: 'section',
        },
      },
      {
        $unwind: '$section',
      },
      {
        $project: {
          termId: '$termId',
          sectionLabel: '$section.label',
          sectionId: '$section._id',
          classLabel: '$classLabel',
          classSchoolId: '$classSchoolId',
        },
      },
    ]);
    return res.json(groupedRoutine);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteAllRoutinesBySectionId = async (req, res) => {
  try {
    const { id } = req.params; //section id
    return res.json(await Routine.deleteMany({ sectionId: id }));
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
  groupRoutineByClassSchoolId,
  deleteAllRoutinesBySectionId,
};

// find subjects with class school id.
