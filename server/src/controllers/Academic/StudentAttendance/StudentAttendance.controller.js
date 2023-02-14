const Attendance = require('../../../models/Academic/StudentAttendance/StudentAttendance.mongo');
const { format, parse, parseISO } = require('date-fns');

// create attendance
const takeAttendance = async (req, res) => {
  try {
    let { attendanceDate, status, studentRecordId, termId } = req.body;

    return res.json(
      await Attendance.updateOne(
        { attendanceDate, studentRecordId },
        {
          attendanceDate,
          status,
          studentRecordId,
          termId,
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

module.exports = {
  deleteAttendance,
  getallAttendanceByTermId,
  takeAttendance,
  updateAttendance,
};
