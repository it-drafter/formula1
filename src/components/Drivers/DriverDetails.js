import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import { Link, Breadcrumbs } from '@mui/material';
import Footer from '../UI/Footer';
import GlobalContext from '../../context/global-context';
import DriverDetailsRaces from './DriverDetailsRaces';

import BreadCrumbs from '../UI/BreadCrumbs';

const DriverDetails = () => {
  const globalCtx = useContext(GlobalContext);
  console.log('Chosen year: ', globalCtx.chosenYear);

  const [driverDetails, setDriverDetails] = useState([]);
  const [driverDetailsRaces, setDriverDetailsRaces] = useState([]);
  // const [flags, setFlags] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const handleRouteToGrandPrix = (race) => {
    console.log('komentar');
    const linkTo = `/races/details/${race}`;
    navigate(linkTo);
  };

  // console.log('DriverDetails', params.driverId);
  // const driverId = params.driverId;

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

  const getDriverDetails = async () => {
    // console.log('DriverDetails', params.driverId);
    // const driverId = params.driverId;
    const urlDriver = `https://raw.githubusercontent.com/nkezic/f1/main/DriverDetails`;
    // `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${driverId}/driverStandings.json`;
    const urlRaces = `https://raw.githubusercontent.com/nkezic/f1/main/DriverRaces`;
    // `http://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${driverId}/results.json`;
    // const urlFlags =
    //   'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json';
    try {
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
    } catch (err) {
      //   console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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

  console.log('DRIVERS', driverDetails.Driver.driverId);

  return (
    <>
      <BreadCrumbs levels={[['Drivers', '/drivers'], 'Driver Details']} />

      <span>Season {globalCtx.chosenYear}</span>

      <div className='table-const-race'>
        <div className='team-details'>
          <div>
            <img
              src={`/img/drivers/${driverDetails.Driver.driverId}.png`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `/img/drivers/unknownDriver.png`;
              }}
              style={{ maxHeight: '100px', paddingRight: '30px' }}
              alt='Driver'
            />
          </div>
          <div>
            <div className='flagName'>
              {globalCtx.flagFn(driverDetails?.Driver.nationality)}
              <span> </span>
              {driverDetails.Driver.givenName +
                ' ' +
                driverDetails.Driver.familyName}
            </div>

            <p>
              Nationality: {driverDetails?.Driver.nationality}
              <span></span>
            </p>
            <p>Team: {driverDetails?.Constructors[0].name}</p>
            <p>Date of Birth: {driverDetails?.Driver.dateOfBirth}</p>
            <p>
              Biography:
              <a href={driverDetails?.Driver.url} target='_blank'>
                ↗
              </a>
            </p>
          </div>
        </div>
        <div>
          <DriverDetailsRaces
            driverDetailsRaces={driverDetailsRaces}
            handleRouteToGrandPrix={handleRouteToGrandPrix}
            className='mouseHandle'
          />
        </div>
       
      </div>
      <Footer />
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