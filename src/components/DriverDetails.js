import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import { Link, Breadcrumbs } from '@mui/material';

import GlobalContext from '../context/global-context';
import DriverDetailsRaces from './DriverDetailsRaces';

const DriverDetails = () => {
  const globalCtx = useContext(GlobalContext);
  console.log('Chosen year: ', globalCtx.chosenYear);

  const [driverDetails, setDriverDetails] = useState([]);
  const [driverDetailsRaces, setDriverDetailsRaces] = useState([]);
  // const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const handleRouteToGrandPrix = (race) => {
    console.log('komentar');
    const linkTo = `/races/details/${race}`;
    navigate(linkTo);
  };

  // console.log('DriverDetails', params.driverId);
  const driverId = params.driverId;

  // const getFlags = async () => {
  //   const urlFlags = 'https://flagcdn.com/en/codes.json';
  //   const responseFlags = await axios.get(urlFlags);
  //   console.log("response", responseFlags);

  //   setFlags (responseFlags.data.data);
  //   // console.log("ZASTAVICE", flags);
  // }

  useEffect(() => {
    getDriverDetails();
  }, []);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  const handleBCRoute = (path) => {
    console.log('klikkk');
    navigate(path);
  };

  const getDriverDetails = async () => {
    // console.log('DriverDetails', params.driverId);
    // const driverId = params.driverId;
    const urlDriver = `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${driverId}/driverStandings.json`;
    const urlRaces = `http://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${driverId}/results.json`;
    // const urlFlags =
    //   'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json';
    const responseDriver = await axios.get(urlDriver);
    const responseRaces = await axios.get(urlRaces);
    // const responseFlags = await axios.get(urlFlags);
    // console.log('responseFlags', responseFlags.data);

    setDriverDetails(
      responseDriver.data.MRData.StandingsTable.StandingsLists[0]
        ?.DriverStandings[0]
    );
    setDriverDetailsRaces(responseRaces.data.MRData.RaceTable.Races);
    // setFlags(responseFlags.data);
    setIsLoading(false);
  };

  // const flagFunction = (nationality) => {
  //   const country = flags.filter((flag) => flag.nationality === nationality);
  //   // console.log('nationality:', nationality);
  //   // console.log('flags:', flags);
  //   // console.log('country:', country[0]?.alpha_2_code);
  //   let flagCode = country[0]?.alpha_2_code;

  //   if (!flagCode && nationality === 'British') {
  //     flagCode = 'GB';
  //   } else if (!flagCode && nationality === 'Dutch') {
  //     flagCode = 'NL';
  //   } else if (!flagCode) {
  //     return <span></span>;
  //   } else {
  //     flagCode = country[0]?.alpha_2_code;
  //   }

  //   return <Flag size={20} country={flagCode} />;
  // };

  if (isLoading) {
    return (
      <RiseLoader
        style={{
          marginTop: '100px',
        }}
      />
    );
  }

  // console.log(driverDetailsRaces);

  return (
    <>
      <div className='driverDetails'>
        <div>
          <div role='presentation' onClick={handleClick}>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link
                underline='hover'
                color='black'
                onClick={() => handleBCRoute('/')}
                className='rucica'
              >
                Home
              </Link>
              <Link
                underline='hover'
                color='black'
                onClick={() => handleBCRoute('/drivers')}
                className='rucica'
              >
                Drivers
              </Link>
              <Link
                underline='hover'
                color='text.red'
                onClick={() => handleBCRoute()}
                className='rucica'
                aria-current='page'
              >
                Driver Details
              </Link>
            </Breadcrumbs>
          </div>

          <h2>Driver details</h2>
          <p>
            Nationality: {driverDetails?.Driver.nationality}
            {globalCtx.flagFn(driverDetails?.Driver.nationality)}
          </p>
          <p>Team: {driverDetails?.Constructors[0].constructorId}</p>
          <p>Date of Birth: {driverDetails?.Driver.dateOfBirth}</p>
          <p>Biography: {driverDetails?.Driver.url}</p>
        </div>
      </div>

      <DriverDetailsRaces
        driverDetailsRaces={driverDetailsRaces}
        handleRouteToGrandPrix={handleRouteToGrandPrix}
        className='rucica'
      />
    </>
  );
};

export default DriverDetails;

// const DriverDetails = () => {
//   const params = useParams();
//   console.log('DriverDetails', params.driverId);
//   return (
//     <>
//       <h1>Driver Details</h1>
//       <h2>{params.driverId}</h2>
//     </>
//   );
// };

// export default DriverDetails;
