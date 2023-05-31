import React, { useEffect, useState, useContext } from 'react';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import YearSelect from './YearSelect';
import Drivers from './Drivers/Drivers';
import BreadCrumbs from './UI/BreadCrumbs';
import { RiseLoader } from 'react-spinners';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import GlobalContext from '../context/global-context';
import DriversTableRow from './Drivers/DriversTableRow';
import YearSelect from './UI/YearSelect';
import Footer from './UI/Footer';

// import { useContext } from 'react';
// import GlobalContext from '../context/global-context';

const Home = () => {
  // const [reRender, setReRender] = useState(false);
  // const handleReRender = () => {
  //   console.log('rerender');
  //   setReRender(!reRender);
  // };
  const globalCtx = useContext(GlobalContext);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDrivers();
  }, [globalCtx.chosenYear]);

  // const [selectYear, setSelecetYear] = useState(null);

  // const handleSelectedYear = (year) => {
  //   console.log('Home component:', year);
  //   // return year;
  // };

  const getDrivers = async () => {
    // const urlDrivers = `https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers`;
    const urlDrivers = `http://ergast.com/api/f1/${globalCtx.chosenYear}/driverStandings.json`;
    try {
      const response = await axios.get(urlDrivers);
      console.warn('response', response);
      const data =
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      console.log(data, ' data');
      setDrivers(data);
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

  if (isLoading) {
    return (
      <>
        <RiseLoader
          style={{
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        {/* <Skeleton animation='wave' height={50} width='90%' /> 
       <Skeleton variant="rounded" animation='wave' height={600} style={{ width: '90%', alignItems: 'center' }} />
       <Placeholder bg='danger' style={{ width: '90%', height: '500px' }} />  */}
      </>
    );
  }

  return (
    <>
      <BreadCrumbs />

      <YearSelect />

      {/* <Drivers home={true} /> */}
      <Table className='table-home'>
        <TableHead className='table-head'>
          <TableRow className='table-head'>
            <TableCell>Position: </TableCell>
            <TableCell>Driver: </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='table-body'>
          {drivers.map((driver) => (
            <TableRow
              key={driver.Driver.driverId}
              driver={driver}
              className='table-body'
            >
              <TableCell>{driver.position}</TableCell>
              <TableCell>
                {driver.Driver.givenName + ' ' + driver.Driver.familyName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Footer />
    </>
  );
};

export default Home;
