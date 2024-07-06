import React, { createContext, useState, useEffect } from 'react';

const ControlsContext = createContext();

const ControlsProvider = ({ children }) => {
  const [controls, setControls] = useState({
    complete: 0,
    partial: 0,
    notApplied: 0,
  });

  useEffect(() => {
    const savedControls = JSON.parse(localStorage.getItem('controls'));
    if (savedControls) {
      setControls(savedControls);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('controls', JSON.stringify(controls));
  }, [controls]);

  return (
    <ControlsContext.Provider value={{ controls, setControls }}>
      {children}
    </ControlsContext.Provider>
  );
};

export { ControlsContext, ControlsProvider };
