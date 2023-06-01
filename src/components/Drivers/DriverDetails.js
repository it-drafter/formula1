import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
//import { Skeleton } from '@mui/material';
import Footer from '../UI/Footer';
import GlobalContext from '../../context/global-context';
import DriverDetailsRaces from './DriverDetailsRaces';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BreadCrumbs from '../UI/BreadCrumbs';
import YearSelect from '../UI/YearSelect';
import Stack from '@mui/material/Stack';

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
  const driverId = params.driverId;
  // console.log("params", params);

  // const getFlags = async () => {
  //   const urlFlags = 'https://flagcdn.com/en/codes.json';
  //   const responseFlags = await axios.get(urlFlags);
  //   console.log("response", responseFlags);

  //   setFlags (responseFlags.data.data);
  //   // console.log("ZASTAVICE", flags);
  // }

  useEffect(() => {
    getDriverDetails();
  }, [globalCtx.chosenYear]);

  const getDriverDetails = async () => {
    setError(null);
    // console.log('DriverDetails', params.driverId);
    // const driverId = params.driverId;

    // const urlDriver = `https://raw.githubusercontent.com/nkezic/f1/main/DriverDetails`;
    const urlDriver = `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${driverId}/driverStandings.json`;
    // const urlRaces = `https://raw.githubusercontent.com/nkezic/f1/main/DriverRaces`;
    const urlRaces = `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${driverId}/results.json`;

    // const urlFlags =
    //   'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json';
    try {
      const responseDriver = await axios.get(urlDriver);
      const responseRaces = await axios.get(urlRaces);
      // const responseFlags = await axios.get(urlFlags);
      // console.log('responseFlags', responseFlags.data);

      // console.log(
      //   'responseDRIVER: ',
      //   responseDriver.data.MRData.StandingsTable.StandingsLists[0]
      //     .DriverStandings[0]
      // );

      setDriverDetails(
        responseDriver.data.MRData.StandingsTable.StandingsLists[0]
          .DriverStandings[0]
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
    // return <p>Error: {error.message}</p>;
    return (
      <>
        <div className='px-5 w-100 d-flex justify-content-start mb-3'>
          <BreadCrumbs levels={[['Drivers', '/drivers'], 'Driver Details']} />
        </div>
        {/* <span className='tableRow-boldCell'>Season {globalCtx.chosenYear}</span> */}

        <h2 className='tableRow-boldCell text-success mt-5 mb-0 mx-auto text-center'>
          No data for driver {driverId} in season {globalCtx.chosenYear}
        </h2>

        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <RiseLoaderSpinner />
      </>
    );
  }

  // console.log('DRIVERS', driverDetails.Driver.driverId);

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-start mb-3'>
        <BreadCrumbs levels={[['Drivers', '/drivers'], 'Driver Details']} />
      </div>

      <div className='text-center'>
        <span className='tableRow-boldCell text-success'>
          Season {globalCtx.chosenYear}
        </span>
      </div>
      <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={2}
        m={5}
        alignItems='flex-start'
      >
        <Table className='table-const-race'>
          <TableBody className='detailsBody'>
            <TableRow>
              <TableCell align='center' colSpan={2}>
                <img
                  src={`./img/drivers/${driverId}.png`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = `./img/drivers/unknownDriver.png`;
                  }}
                  style={{ maxHeight: '100px', paddingRight: '30px' }}
                  alt='Driver'
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className='flagName tableRow-boldCell'
                colSpan={2}
                align='center'
              >
                {globalCtx.flagFn(driverDetails?.Driver.nationality)}
                <span> </span>
                {driverDetails.Driver.givenName +
                  ' ' +
                  driverDetails.Driver.familyName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tableRow-cell'>Nationality:</TableCell>
              <TableCell className='tableRow-cell'>
                {driverDetails?.Driver.nationality}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tableRow-cell'>Team:</TableCell>
              <TableCell className='tableRow-cell'>
                {driverDetails?.Constructors[0].name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tableRow-cell'>Date of Birth:</TableCell>
              <TableCell className='tableRow-cell'>
                {driverDetails?.Driver.dateOfBirth}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='tableRow-cell'>Biography:</TableCell>
              <TableCell className='details-btn'>
                {' '}
                <a href={driverDetails?.Driver.url} target='_blank'>
                  Wikipedia <OpenInNewIcon />
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DriverDetailsRaces
          driverDetailsRaces={driverDetailsRaces}
          handleRouteToGrandPrix={handleRouteToGrandPrix}
          className='mouseHandle'
        />
      </Stack>

      <Footer />
    </>
  );
};

export default DriverDetails;
