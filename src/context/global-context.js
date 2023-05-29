import React from 'react';

const GlobalContext = React.createContext({
  chosenYear: '',
  flagFn: () => {},
  setYearFn: () => {},
  searchStringValue: '',
  setSearchStringFn: () => {},
});

export default GlobalContext;
