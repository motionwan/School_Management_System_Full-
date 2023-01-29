import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist') || false)
  );
  // console.log(auth);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        currentData,
        setCurrentData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
