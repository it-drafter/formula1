import React, { useState, useEffect, useContext } from 'react';
import Navigation from './components/UI/Navigation';
import axios from 'axios';
import Flag from 'react-flagkit';
import GlobalContext from './context/global-context';
import moment from 'moment/moment';

const App = () => {
  const [flags, setFlags] = useState([]);
  const [year, setYear] = useState(moment().year());
  const [searchString, setSearchString] = useState('Enter search criterium!');
  const [error, setError] = useState(null);

  useEffect(() => {
    getFlags();
  }, []);

  const getFlags = async () => {
    try {
      const urlFlags =
        'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json';
      const responseFlags = await axios.get(urlFlags);

      setFlags(responseFlags.data);
    } catch (err) {
      setError(err);
    }
  };

  const flagFunction = (nationality, flagSize = 20) => {
    const country = flags.filter(
      (flag) =>
        flag.nationality === nationality || flag.en_short_name === nationality
    );
    let flagCode = country[0]?.alpha_2_code;

    if (!flagCode && nationality === 'Monegasque') {
      flagCode = 'MC';
    } else if (!flagCode && nationality === 'UAE') {
      flagCode = 'AE';
    } else if (!flagCode && nationality === 'Dutch') {
      flagCode = 'NL';
    } else if (!flagCode && nationality === 'Korea') {
      flagCode = 'KR';
    } else if (!flagCode && nationality === 'USA') {
      flagCode = 'US';
    } else if (!flagCode && nationality === 'New Zealander') {
      flagCode = 'NZ';
    } else if (
      (!flagCode && nationality.includes('British')) ||
      nationality === 'UK'
    ) {
      flagCode = 'GB';
    } else if (nationality === 'Azerbaijan') {
      return <img src='./img/flags/AZ.svg' />;
    } else if (!flagCode) {
      return (
        <img
          style={{ width: '21px', height: '15px' }}
          src='./img/neutral.svg'
        />
      );
    } else {
      flagCode = country[0]?.alpha_2_code;
    }

    return <Flag size={flagSize} country={flagCode} />;
  };

  return (
    <GlobalContext.Provider
      value={{
        chosenYear: year,
        flagFn: flagFunction,
        setYearFn: setYear,
        setSearchStringFn: setSearchString,
        searchStringValue: searchString,
      }}
    >
      <Navigation />
    </GlobalContext.Provider>
  );
};

export default App;
