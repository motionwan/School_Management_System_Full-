require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
mongoose.set('strictQuery', false);
const imageFolder = './images';

const app = express();

// connect to mongodb
const Connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO}`);
    console.log('Connection to server established');
  } catch (err) {
    return err.message;
  }
};

Connect();

const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000'],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(imageFolder));
app.use(cookieParser());
app.use(express.static('public/uploads'));
app.use(cors(corsOption));

// import routes
const SchoolsRouter = require('./routes/SchoolManagement/Schools/Schools.router');
const ClassRouter = require('./routes/SchoolManagement/Classes/classes.router');
const ClassSchoolRouter = require('./routes/Academics/ClassSchool/ClassSchool.router');
const TermRouter = require('./routes/SchoolManagement/Terms/Terms.router');
const HomeworkRouter = require('./routes/Academics/Homework/Homework.router');
const HomeworkSectionRouter = require('./routes/Academics/HomeworkSection/HomeworkSection.router');
const StudyMaterialRouter = require('./routes/Academics/StudyMaterials/StudyMaterials.router');
const ClassSchoolStudyMaterialRouter = require('./routes/Academics/ClassSchoolStudyMaterials/ClassSchoolStudyMaterial.router');
const StudentAttendanceRouter = require('./routes/Academics/StudentAttendance/StudentAttendance.router');
const OnlineClassRouter = require('./routes/Academics/OnlineClasses/OnlineClasses.router');
const SubjectRouter = require('./routes/Academics/Subjects/Subjects.router');
const StudentRecordRouter = require('./routes/Student/StudentRecord/StudentRecord.router');
const StaffRouter = require('./routes/Staff/Staff/Staff.router');
const RoleRouter = require('./routes/Staff/Roles/Roles.router');
const RefreshTokenRouter = require('./routes/Staff/refresh/RefreshToken.router');
const SettingsRouter = require('./routes/School/Settings/Settings.router');
const ActiveSchoolRouter = require('./routes/School/ActiveSchool/active.router');
const ClassSectionRouter = require('./routes/Academics/ClassSection/classSection.router');
const RoutineRouter = require('./routes/Academics/Routine/Routine.router');
const StudentPermissionsRouter = require('./routes/Academics/Exeat/Exeat.router');
const NoticeRouter = require('./routes/Academics/Notice/Notice.router');
const EventRouter = require('./routes/Academics/Events/event.router');
const StaffPermissionsRouter = require('./routes/Staff/Permissions/Permissions.router');
const ExamPaperRouter = require('./routes/Examination/ExamPaper/ExamPaper.router');
const ExamRouter = require('./routes/Examination/Exams/Examination.router');
const ClassSchoolExamRouter = require('./routes/Examination/ClassSchoolExams/ClassSchoolExams.router');
const ExamResultRouter = require('./routes/Examination/ExamResult/ExamsResult.router');
const HostelRouter = require('./routes/Hostel/Hostel.router');
const RoomRouter = require('./routes/Hostel/Rooms/Rooms.router');

//call routes
app.use('/schools', SchoolsRouter);
app.use('/classes', ClassRouter);
app.use('/class_school', ClassSchoolRouter);
app.use('/term', TermRouter);
app.use('/homework', HomeworkRouter);
app.use('/homework_section', HomeworkSectionRouter);
app.use('/study_materials', StudyMaterialRouter);
app.use('/class_school_study_materials', ClassSchoolStudyMaterialRouter);
app.use('/student_attendance', StudentAttendanceRouter);
app.use('/subject', SubjectRouter);
app.use('/student_record', StudentRecordRouter);
app.use('/staff', StaffRouter);
app.use('/role', RoleRouter);
app.use('/refresh', RefreshTokenRouter);
app.use('/settings', SettingsRouter);
app.use('/active', ActiveSchoolRouter);
app.use('/class_section', ClassSectionRouter);
app.use('/timetable', RoutineRouter);
app.use('/exeat', StudentPermissionsRouter);
app.use('/notice', NoticeRouter);
app.use('/event', EventRouter);
app.use('/permission', StaffPermissionsRouter);
app.use('/exams_paper', ExamPaperRouter);
app.use('/exams', ExamRouter);
app.use('/class_school_exams', ClassSchoolExamRouter);
app.use('/exams_result', ExamResultRouter);
app.use('/hostel', HostelRouter);
app.use('/room', RoomRouter);
app.use('/online-class', OnlineClassRouter);

module.exports = app;
