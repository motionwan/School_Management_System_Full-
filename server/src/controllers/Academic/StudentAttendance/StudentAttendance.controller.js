const Attendance = require('../../../models/Academic/StudentAttendance/StudentAttendance.mongo');
const { startOfMonth, endOfMonth, parseISO } = require('date-fns');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// create attendance
const takeAttendance = async (req, res) => {
  try {
    let { attendanceDate, status, studentRecordId, sectionId, termId } =
      req.body;

    return res.json(
      await Attendance.updateOne(
        { attendanceDate, studentRecordId },
        {
          attendanceDate,
          status,
          studentRecordId,
          termId,
          sectionId,
        },
        { upsert: true }
      )
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// get all attendance
//match by term id and do the rest later
const getallAttendanceByTermId = async (req, res) => {
  try {
    const { id } = req.params;
    return res.json(await Attendance.find({ termId: id }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

//update attendance
const updateAttendance = async (req, res) => {
  try {
    const id = req.params.id; // attendance id
    const { attendanceDate, status, studentRecordId } = req.body;
    return res.json(
      await Attendance.findByIdAndUpdate(id, {
        attendanceDate,
        status,
        studentRecordId,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status.json({ error: err.message });
  }
};

// delete attendance
const deleteAttendance = async (req, res) => {
  try {
    const id = req.params.id; // attendance id
    return res.json(await Attendance.findByIdAndDelete(id));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

const getMonthlyAttendance = async (req, res) => {
  try {
    const { sectionId, date } = req.body;
    const attendanceDate = parseISO(`${date}-01`);

    const start = startOfMonth(attendanceDate);
    const end = endOfMonth(attendanceDate);

    const attendance = await Attendance.aggregate([
      {
        $match: {
          attendanceDate: {
            $gte: start,
            $lte: end,
          },
          sectionId: ObjectId(sectionId),
        },
      },
      {
        $group: {
          _id: '$studentRecordId',
          attendance: {
            $addToSet: {
              status: '$status',
              attendanceDate: '$attendanceDate',
            },
          },
        },
      },
      {
        $unwind: '$attendance',
      },
      {
        $lookup: {
          from: 'studentrecords',
          localField: '_id',
          foreignField: '_id',
          as: 'student',
        },
      },
      {
        $unwind: '$student',
      },
      {
        $project: {
          _id: 1,
          attendance: 1,
          student: {
            name: '$student.fullName',
            rollNumber: '$student.admissionNumber',
          },
        },
      },
    ]);

    res.json(attendance);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  deleteAttendance,
  getallAttendanceByTermId,
  takeAttendance,
  updateAttendance,
  getMonthlyAttendance,
};
