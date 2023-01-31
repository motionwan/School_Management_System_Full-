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
            {/* Another route */}//
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
            <Route element={<RequireAuth permissions='/super-admin' />}>
              <Route
                path='/school_management/schools/:id/update'
                element={<UpdateSchool />}
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
