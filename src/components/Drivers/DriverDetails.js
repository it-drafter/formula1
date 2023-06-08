import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import Footer from '../UI/Footer';
import GlobalContext from '../../context/global-context';
import DriverDetailsRaces from './DriverDetailsRaces';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BreadCrumbs from '../UI/BreadCrumbs';
import Stack from '@mui/material/Stack';
import YearSelect from '../UI/YearSelect';

const DriverDetails = () => {
  const globalCtx = useContext(GlobalContext);
  const [driverDetails, setDriverDetails] = useState([]);
  const [driverDetailsRaces, setDriverDetailsRaces] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const handleRouteToGrandPrix = (race) => {
    const linkTo = `/races/details/${race}`;
    navigate(linkTo);
  };
  const driverId = params.driverId;
  useEffect(() => {
    getDriverDetails();
  }, [globalCtx.chosenYear]);

  const getDriverDetails = async () => {
    setIsLoading(true);
    setError(null);
    const urlDriver = `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${driverId}/driverStandings.json`;
    const urlRaces = `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${driverId}/results.json`;
    try {
      const responseDriver = await axios.get(urlDriver);
      const responseRaces = await axios.get(urlRaces);
      setDriverDetails(
        responseDriver.data.MRData.StandingsTable.StandingsLists[0]
          .DriverStandings[0]
      );
      setDriverDetailsRaces(responseRaces.data.MRData.RaceTable.Races);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return (
      <>
        <div className='px-5 w-100 d-flex justify-content-start mb-3'>
          <BreadCrumbs levels={[['Drivers', '/drivers'], 'Driver Details']} />
        </div>
        <h2 className='tableRow-boldCell text-success mt-5 mb-3 mx-auto text-center'>
          No data for driver {driverId} in season {globalCtx.chosenYear}.
        </h2>
        <h2 className='tableRow-boldCell text-success mb-3 mx-auto text-center'>
          Choose another season.
        </h2>
        <div className='text-center'>
          <YearSelect />
        </div>
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
  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-start mb-3'>
        <BreadCrumbs levels={[['Drivers', '/drivers'], 'Driver Details']} />
      </div>

      <div className='text-center'>
        <YearSelect />
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
                    currentTarget.onerror = null;
                    currentTarget.src = `./img/drivers/unknownDriver.png`;
                  }}
                  style={{ maxHeight: '100px' }}
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
              <TableCell align='center' className='tableRow-cell'>
                Nationality:
              </TableCell>
              <TableCell align='center' className='tableRow-cell'>
                {driverDetails?.Driver.nationality}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className='tableRow-cell'>
                Team:
              </TableCell>
              <TableCell align='center' className='tableRow-cell'>
                {driverDetails?.Constructors[0].name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className='tableRow-cell'>
                Date of Birth:
              </TableCell>
              <TableCell align='center' className='tableRow-cell'>
                {driverDetails?.Driver.dateOfBirth}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className='tableRow-cell'>
                Biography:
              </TableCell>
              <TableCell align='center' className='details-btn'>
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
