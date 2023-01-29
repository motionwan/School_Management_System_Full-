import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from './Components/Layout/Layout';
import { GlobalStyle } from './Styles/globalStyles';
import { lightTheme, darkTheme } from './Styles/themes';
import { Routes, Route } from 'react-router-dom';
//import HomePage from './pages/HomePage';
import Diagrams from './pages/Diagrams';
import Customers from './pages/Customers';
import Statistics from './pages/Statistics';
import Login from './pages/Auth/Login';
export const ThemeContext = React.createContext(null);

const App = () => {
  const [theme, setTheme] = useState('light');
  const themeStyle = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ setTheme, theme }}>
      <ThemeProvider theme={themeStyle}>
        <GlobalStyle />
        <Layout>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/diagrams' element={<Diagrams />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/Statistics' element={<Statistics />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
