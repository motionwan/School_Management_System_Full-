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
import Schools from './pages/SchoolManagement/School';
import Classes from './pages/SchoolManagement/Classes';
import Terms from './pages/SchoolManagement/Terms';
export const ThemeContext = React.createContext(null);

const App = () => {
  const [theme, setTheme] = useState('light');
  const themeStyle = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />

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
          </Route>
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
