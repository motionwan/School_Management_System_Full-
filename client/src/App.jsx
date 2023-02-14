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
import Subject from './pages/Academic/Subjects/Subjects';
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
import ViewTimetable from './pages/Academic/TimeTable/ViewTimetable';
import Schedule from './pages/Academic/TimeTable/Schedule';
import ViewAttendance from './pages/Academic/Attendance/ViewAttendance';
import AddAttendance from './pages/Academic/Attendance/AddAttendance';
import AddAdmission from './pages/Academic/Students/Admission/AddAdmission';
import StudentDashboard from './pages/Academic/Students/Dashboard/StudentDashboard';
import ViewStudents from './pages/Academic/Students/Students/ViewStudents';
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
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth permissions='/staff' />}>
              <Route path='/dashboard' element={<Dashboard />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route path='/school_management' element={<SchoolManagement />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route path='/school_management/schools' element={<Schools />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route path='/school_management/classes' element={<Classes />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route path='/school_management/terms' element={<Terms />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route
                path='/school_management/terms/add'
                element={<AddTerm />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route
                path='/school_management/terms/:id/update'
                element={<UpdateTerm />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route
                path='/school_management/classes/add'
                element={<AddClass />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route
                path='/school_management/classes/:id/update'
                element={<UpdateClass />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route path='/school_management/terms' element={<Terms />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route
                path='/school_management/schools/add'
                element={<AddSchool />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            <Route element={<RequireAuth permissions='/admin' />}>
              <Route
                path='/school_management/schools/:id/update'
                element={<UpdateSchool />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route path='/client_school/:id' element={<SchoolDashboard />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id'
                element={<AcademicDashboard />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>

            {/* new route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/assign_classes'
                element={<AssignClasses />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* end of route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/class_sections'
                element={<ClassSections />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/add_class_sections'
                element={<AddSection />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/update_class_section'
                element={<UpdateSection />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/subjects'
                element={<Subjects />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/update_subject'
                element={<UpdateSubject />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_school/:id/add_subjects'
                element={<AddSubjects />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/timetable'
                element={<TimeTable />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/add_timetable'
                element={<AddTimeTable />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/update_timetable'
                element={<UpdateTimeTable />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/view_timetable'
                element={<Schedule />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/attendance'
                element={<ViewAttendance />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_academic/:id/add_attendance'
                element={<AddAttendance />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_student/:id'
                element={<StudentDashboard />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_student/:id/admission'
                element={<AddAdmission />}
              />
              {/* routes to browse if permission is included in user permission */}
            </Route>
            {/* Another route */}

            {/* Another route */}
            <Route
              element={<RequireAuth permissions={['/admin', 'super-admin']} />}
            >
              <Route
                path='/client_student/:id/students'
                element={<ViewStudents />}
              />
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
