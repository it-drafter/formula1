import React from 'react';

const GlobalContext = React.createContext({
  chosenYear: '',
  flagFn: () => {},
  setYearFn: () => {},
});

export default GlobalContext;
