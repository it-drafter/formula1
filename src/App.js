import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import axios from 'axios';
import Flag from 'react-flagkit';
import GlobalContext from './context/global-context';
import YearContext from './context/global-context';


const App = () => {
  const [flags, setFlags] = useState([]);
  const [year, setYear] = useState([]);

  useEffect(() => {
    getFlags();
    setYear('2013');
  }, []);

  


  const getFlags = async () => {
    // console.log('DriverDetails', params.driverId);
    // const driverId = params.driverId;
    const urlFlags =
      'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json';
    const responseFlags = await axios.get(urlFlags);
    // console.log('responseFlags', responseFlags.data);

    setFlags(responseFlags.data);
  };

  const flagFunction = (nationality) => {
    const country = flags.filter((flag) => flag.nationality === nationality);
    // console.log('nationality:', nationality);
    // console.log('flags:', flags);
    // console.log('country:', country[0]?.alpha_2_code);
    let flagCode = country[0]?.alpha_2_code;

    if (!flagCode && nationality === 'British') {
      flagCode = 'GB';
    } else if (!flagCode && nationality === 'Dutch') {
      flagCode = 'NL';
    } else if (!flagCode) {
      return <span></span>;
    } else {
      flagCode = country[0]?.alpha_2_code;
    }

    return <Flag size={20} country={flagCode} />;
  };

  return (
    <GlobalContext.Provider
      value={{
        chosenYear: year,
        flagFn: flagFunction,
      }}
    >
      <Navigation />
    </GlobalContext.Provider>
  );
};

export default App;
