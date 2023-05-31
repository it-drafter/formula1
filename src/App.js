import React, { useState, useEffect, useContext } from 'react';
import Navigation from './components/UI/Navigation';
import axios from 'axios';
import Flag from 'react-flagkit';
import GlobalContext from './context/global-context';
import moment from 'moment/moment';

const App = () => {
  // const globalCtx = useContext(GlobalContext);

  // console.log('IVAN: ', globalCtx.setYearFn());

  const [flags, setFlags] = useState([]);
  const [year, setYear] = useState(moment().year());
  // const [year, setYear] = useState(2013);
  const [searchString, setSearchString] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    getFlags();
    // setYear(globalCtx.setYearFn() ?? new Date().getFullYear());
  }, []);

  const getFlags = async () => {
    // console.log('DriverDetails', params.driverId);
    // const driverId = params.driverId;
    try {
      const urlFlags =
        'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json';
      const responseFlags = await axios.get(urlFlags);
      // console.log('responseFlags', responseFlags.data);

      setFlags(responseFlags.data);
    } catch (err) {
      //   console.log(err);
      setError(err);
    }
  };

  if (error) {
    // return <p>Error: {error.message}</p>;
    console.log('Flags error: ', error.message);
  }

  const flagFunction = (nationality, flagSize = 20) => {
    const country = flags.filter(
      (flag) =>
        flag.nationality === nationality || flag.en_short_name === nationality
      // flag.alpha_3_code.includes(nationality) ||
      // flag.alpha_2_code.includes(nationality)
    );
    // console.log('nationality:', nationality);
    // console.log('flags:', flags);
    // console.log('country:', country[0]?.alpha_2_code);
    let flagCode = country[0]?.alpha_2_code;

    if (!flagCode && nationality === 'Monegasque') {
      flagCode = 'MN';
    } else if (!flagCode && nationality === 'UAE') {
      flagCode = 'AE';
    } else if (!flagCode && nationality === 'Dutch') {
      flagCode = 'NL';
    } else if (!flagCode && nationality === 'Korea') {
      flagCode = 'KR';
    } else if (!flagCode && nationality === 'USA') {
      flagCode = 'US';
    } else if (
      (!flagCode && nationality.includes('British')) ||
      nationality === 'UK'
    ) {
      flagCode = 'GB';
    } else if (nationality === 'Azerbaijan') {
      return <img src='/img/flags/AZ.svg' />;
    } else if (!flagCode) {
      return (
        <img style={{ width: '21px', height: '15px' }} src='/img/neutral.svg' />
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
