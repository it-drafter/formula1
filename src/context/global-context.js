import React from 'react';

const GlobalContext = React.createContext({
  chosenYear: '',
  flagFn: () => {},
});

export default GlobalContext;
