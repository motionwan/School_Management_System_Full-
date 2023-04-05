import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import RouteLayout from './Components/Layout';
import { GlobalStyle } from './Styles/globalStyles';
import { lightTheme, darkTheme } from './Styles/themes';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import PersistLogin from './Components/PersistLogin';
import RequireAuth from './helpers/RequireAuth';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import SchoolManagement from './pages/SchoolManagement/SchoolManagement';
import Schools from './pages/SchoolManagement/Schools/School';
import Classes from './pages/SchoolManagement/Classes/Classes';
import Terms from './pages/SchoolManagement/Terms/Terms';
import AddSchool from './pages/SchoolManagement/Schools/AddSchool';
import UpdateSchool from './pages/SchoolManagement/Schools/UpdateSchool';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import AddClass from './pages/SchoolManagement/Classes/AddClass';
import UpdateClass from './pages/SchoolManagement/Classes/UpdateClass';
import AddTerm from './pages/SchoolManagement/Terms/AddTerm';
import UpdateTerm from './pages/SchoolManagement/Terms/UpdateTerm';
import AcademicDashboard from './pages/Academic/Dashboard/AcademicDashboard';
import ClassSections from './pages/Academic/Sections/ClassSections';
//import Subject from './pages/Academic/Subjects/Subjects';
import AddSubjects from './pages/Academic/Subjects/AddSubjects';
import UpdateSubject from './pages/Academic/Subjects/UpdateSubject';
import SchoolDashboard from './pages/School/SchoolDashboard/SchoolDashboard';
import AssignClasses from './pages/School/AssignClasses/AssignClasses';
import AddSection from './pages/Academic/Sections/AddSection';
import UpdateSection from './pages/Academic/Sections/UpdateSection';
import UpdateTimeTable from './pages/Academic/TimeTable/UpdateTimeTable';
import AddTimeTable from './pages/Academic/TimeTable/AddTimeTable';
import TimeTable from './pages/Academic/TimeTable/TimeTable';
import Subjects from './pages/Academic/Subjects/Subjects';
//import ViewTimetable from './pages/Academic/TimeTable/ViewTimetable';
import Schedule from './pages/Academic/TimeTable/Schedule';
import ViewAttendance from './pages/Academic/Attendance/ViewAttendance';
import AddAttendance from './pages/Academic/Attendance/AddAttendance';
import AddAdmission from './pages/Students/Admission/AddAdmission';
import StudentDashboard from './pages/Students/Dashboard/StudentDashboard';
import ViewStudents from './pages/Students/Students/ViewStudents';
import UpdateStudyMaterials from './pages/Academic/StudyMaterials/UpdateStudyMaterials';
import AddStudyMaterials from './pages/Academic/StudyMaterials/AddStudyMaterials';
import StudyMaterials from './pages/Academic/StudyMaterials/StudyMaterials';
import UpdateExeat from './pages/Academic/Exeat/UpdateExeat';
import AddExeat from './pages/Academic/Exeat/AddExeat';
import Exeat from './pages/Academic/Exeat/Exeat';
import HomeWork from './pages/Academic/Homework/HomeWork';
import AddHomeWork from './pages/Academic/Homework/AddHomeWork';
import UpdateHomeWork from './pages/Academic/Homework/UpdateHomeWork';
import UpdateNotice from './pages/Academic/Noticeboard/UpdateNotice';
import AddNotice from './pages/Academic/Noticeboard/AddNotice';
import Notice from './pages/Academic/Noticeboard/Notice';
import UpdateEvent from './pages/Academic/Events/UpdateEvent';
import AddEvent from './pages/Academic/Events/AddEvent';
import Event from './pages/Academic/Events/Event';
import StudentID from './pages/Students/IDCard/StudentID';
import UpdateRoles from './pages/Administration/Roles/UpdateRoles';
import AddRoles from './pages/Administration/Roles/AddRoles';
import Roles from './pages/Administration/Roles/Roles';
import UpdateStaff from './pages/Administration/StaffList/UpdateStaff';
import AddStaff from './pages/Administration/StaffList/AddStaff';
import Staff from './pages/Administration/StaffList/Staff';
import StaffSignUp from './pages/Auth/StaffSignup';
import UpdateAdmin from './pages/Administration/Admins/UpdateAdmin';
import AddAdmins from './pages/Administration/Admins/AddAdmin';
import Admins from './pages/Administration/Admins/Admins';
import UpdateExams from './pages/Examinamtion/Exams/UpdateExams';
import AddExams from './pages/Examinamtion/Exams/AddExams';
import Examination from './pages/Examinamtion/Exams/Examination';
import AssignTeacher from './pages/Academic/Subjects/AssignTeacher';
import UpdateExamResult from './pages/Examinamtion/ExamResult/UpdateExamResult';
import AddExamResult from './pages/Examinamtion/ExamResult/AddExamResult';
import ExamsResult from './pages/Examinamtion/ExamResult/ExamsResult';
import BulkPrint from './pages/Examinamtion/BulkPrint/PrintResult';
import Promotion from './pages/Students/Promotion/Promotion';
import LiveClasses from './pages/Academic/LiveClasses/LiveClasses';
import UpdateHostel from './pages/Hostels/Hostel/UpdateHostel';
import AddHostel from './pages/Hostels/Hostel/AddHostel';
import Hostel from './pages/Hostels/Hostel/Hostel';
import Settings from './pages/UserSettings/Settings';
import AddOnlineClasses from './pages/Academic/LiveClasses/AddOnlineClasses';
//import Notification from './Components/Notification/Notification';
import AddNotifications from './pages/Students/Notifications/AddNotifications';
import SchoolSettings from './pages/School/Settings/SchoolSettings';
import PaymentHistory from './pages/Accounting/Invoice/PaymentHistory';
import CreateInvoice from './pages/Accounting/Invoice/CreateInvoice';
import Invoices from './pages/Accounting/Invoice/Invoices';
import PayFees from './pages/Accounting/Invoice/PayFees';
export const ThemeContext = React.createContext(null);

const App = () => {
  const [theme, setTheme] = useState('light');
  const themeStyle = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />
        <ReactNotifications />
        <Routes>
          <Route path='/' element={<RouteLayout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/staff/signup/:token/:id' element={<StaffSignUp />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth
                  permissions={[
                    'super-admin',
                    'admin',
                    'teacher',
                    'accountant',
                    'housemaster',
                  ]}
                />
              }
            >
              <Route path='/dashboard' element={<Dashboard />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route path='/school_management' element={<SchoolManagement />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route path='/school_management/schools' element={<Schools />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route path='/school_management/classes' element={<Classes />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route path='/school_management/terms' element={<Terms />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route
                path='/school_management/terms/add'
                element={<AddTerm />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route
                path='/school_management/terms/update'
                element={<UpdateTerm />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route
                path='/school_management/classes/add'
                element={<AddClass />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route
                path='/school_management/classes/update'
                element={<UpdateClass />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route path='/school_management/terms' element={<Terms />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions={['super-admin']} />}>
              <Route
                path='/school_management/schools/add'
                element={<AddSchool />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>

            <Route element={<RequireAuth permissions='admin' />}>
              <Route
                path='/school_management/schools/update'
                element={<UpdateSchool />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_school' element={<SchoolDashboard />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic' element={<AcademicDashboard />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_school/settings'
                element={<SchoolSettings />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic' element={<AcademicDashboard />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>

            {/* new route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/assign_classes'
                element={<AssignClasses />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* end of route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/class_sections'
                element={<ClassSections />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/add_class_sections'
                element={<AddSection />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/update_class_section'
                element={<UpdateSection />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic/subjects' element={<Subjects />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/update_subject'
                element={<UpdateSubject />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/subject/assign_teacher'
                element={<AssignTeacher />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_school/add_subjects'
                element={<AddSubjects />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/timetable'
                element={<TimeTable />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin', 'teacher']}
                />
              }
            >
              <Route
                path='/client_academic/online_classes'
                element={<LiveClasses />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin', 'teacher']}
                />
              }
            >
              <Route
                path='/client_academic/add-online-classes'
                element={<AddOnlineClasses />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/add_timetable'
                element={<AddTimeTable />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/update_timetable'
                element={<UpdateTimeTable />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/view_timetable'
                element={<Schedule />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/attendance'
                element={<ViewAttendance />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/add_attendance'
                element={<AddAttendance />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic/exeat' element={<Exeat />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic/add_exeat' element={<AddExeat />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/update_exeat'
                element={<UpdateExeat />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic/homework' element={<HomeWork />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/add_homework'
                element={<AddHomeWork />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/update_homework'
                element={<UpdateHomeWork />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic/noticeboard' element={<Notice />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_student/notifications'
                element={<AddNotifications />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/add_notice'
                element={<AddNotice />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/update_notice'
                element={<UpdateNotice />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic/events' element={<Event />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_academic/add_event' element={<AddEvent />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/update_event'
                element={<UpdateEvent />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_student' element={<StudentDashboard />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_student/admission'
                element={<AddAdmission />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_student/students'
                element={<ViewStudents />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/study_materials'
                element={<StudyMaterials />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/add_study_materials'
                element={<AddStudyMaterials />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/update_study_materials'
                element={<UpdateStudyMaterials />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/client_student/id' element={<StudentID />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin', 'teacher']}
                />
              }
            >
              <Route path='/client_student/promotion' element={<Promotion />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/roles' element={<Roles />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/add_role' element={<AddRoles />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/update_role' element={<UpdateRoles />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/staffs' element={<Staff />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/add_staff' element={<AddStaff />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/update_staff' element={<UpdateStaff />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/admin' element={<Admins />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/add_admin' element={<AddAdmins />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/exams/exam' element={<Examination />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/exams/add_exams' element={<AddExams />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/exams/update_exams' element={<UpdateExams />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['admin', 'super-admin']} />}
            >
              <Route path='/staff/update_admin' element={<UpdateAdmin />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth permissions={['admin', 'super-admin, teacher']} />
              }
            >
              <Route path='/exams/exam_results' element={<ExamsResult />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth permissions={['admin', 'super-admin, teacher']} />
              }
            >
              <Route
                path='/exams/add_exam_result'
                element={<AddExamResult />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth permissions={['admin', 'super-admin, teacher']} />
              }
            >
              <Route
                path='/exams/update_exam_result'
                element={<UpdateExamResult />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin, house-master']}
                />
              }
            >
              <Route path='/hostel/manage-hostels' element={<Hostel />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin, house-master']}
                />
              }
            >
              <Route path='/hostel/add-hostels' element={<AddHostel />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin, house-master']}
                />
              }
            >
              <Route path='/hostel/update-hostel' element={<UpdateHostel />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={[
                    'admin',
                    'super-admin, house-master',
                    'teacher',
                  ]}
                />
              }
            >
              <Route path='/settings' element={<Settings />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin', 'accountant']}
                />
              }
            >
              <Route path='/account/invoice' element={<Invoices />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin', 'accountant']}
                />
              }
            >
              <Route path='/account/pay-invoice' element={<PayFees />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin', 'accountant']}
                />
              }
            >
              <Route path='/account/add-invoice' element={<CreateInvoice />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth
                  permissions={['admin', 'super-admin', 'accountant']}
                />
              }
            >
              <Route
                path='/account/payment-history'
                element={<PaymentHistory />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={
                <RequireAuth permissions={['admin', 'super-admin, teacher']} />
              }
            >
              <Route path='/exams/print_result' element={<BulkPrint />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
          </Route>
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
