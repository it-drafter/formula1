import React, { useEffect, useState, useContext } from 'react';
import BreadCrumbs from './UI/BreadCrumbs';
import RiseLoaderSpinner from './UI/RiseLoaderSpinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import GlobalContext from '../context/global-context';
import YearSelect from './UI/YearSelect';
import Footer from './UI/Footer';
import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';

const Home = () => {
  const globalCtx = useContext(GlobalContext);
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDrivers();
  }, [globalCtx.chosenYear]);

  const getDrivers = async () => {
    const urlDrivers = `https://ergast.com/api/f1/${globalCtx.chosenYear}/driverStandings.json`;
    try {
      const response = await axios.get(urlDrivers);
      const data =
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setDrivers(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleDriverDetails = (driverId) => {
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };

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
        <BreadCrumbs />
      </div>

      <h1 className='h1 text-center text-success mb-4'>
        Formula 1 Championship Info
      </h1>

      <div className='text-center'>
        <YearSelect />
      </div>

      <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={2}
        m={5}
        alignItems='flex-start'
        className='flex-responsive'
      >
        <img
          className='d-block col h-50 w-50 mb-3'
          src='./img/retro_poster.jpg'
        />

        <Table className='table-home col'>
          <TableHead>
            <TableRow className='table-header'>
              <TableCell
                colSpan={2}
                style={{ backgroundColor: '#8BC6AD', color: '#000704' }}
                className='font-responsive'
              >
                Driver standings for season {globalCtx.chosenYear}.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>
            {drivers.map((driver) => (
              <TableRow
                key={driver.Driver.driverId}
                driver={driver}
                className='table-body'
              >
                <TableCell align='center' className='tableRow-cell p-0'>
                  {driver.position}
                </TableCell>
                <TableCell
                  onClick={() => handleDriverDetails(driver.Driver.driverId)}
                  className='mouseHandle tableRow-cell p-0'
                >
                  <div className='flagName'>
                    {globalCtx.flagFn(driver.Driver.nationality)}
                    <span> </span>
                    {driver.Driver.givenName + ' ' + driver.Driver.familyName}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>

      <Footer />
    </>
  );
};

export default Home;
