// src/context/DataContext.js
import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    university: '',
    state: '',
    degree: '',
    eduStart: '',
    eduEnd: '',
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
