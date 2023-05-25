import React from 'react';

const YearContext = React.createContext({
  chosenYear: '',
  flagFn: () => {},
});

export default YearContext;
