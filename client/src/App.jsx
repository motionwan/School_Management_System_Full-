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
            <Route element={<RequireAuth permissions='/login' />}>
              <Route path='/dashboard' element={<Dashboard />} />
              {/* routes to browse if permission is included in user permission */}
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
