import React, { useEffect, useState, useContext } from 'react';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import YearSelect from './YearSelect';
import Drivers from './Drivers/Drivers';
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
import DriversTableRow from './Drivers/DriversTableRow';
import YearSelect from './UI/YearSelect';
import Footer from './UI/Footer';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';

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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDrivers();
  }, [globalCtx.chosenYear]);

  // const handleDriverDetails= (driverId) => {
  //   console.log("klik na drivera" );
  //   const linkTo= `/drivers/details/${driverId}`;
  //   navigate(linkTo)
  // }

  // const [selectYear, setSelecetYear] = useState(null);

  // const handleSelectedYear = (year) => {
  //   console.log('Home component:', year);
  //   // return year;
  // };
  // onClick={()=>handleDriverDetails(driver.Driver.driverId)}

  const getDrivers = async () => {
    // const urlDrivers = `https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers`;
    const urlDrivers = `https://ergast.com/api/f1/${globalCtx.chosenYear}/driverStandings.json`;
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

  const handleDriverDetails = (driverId) => {
    console.log('klik na drivera', driverId);
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };

  if (isLoading) {
    return (
      <>
        <RiseLoaderSpinner
          // style={{
          //   height: '50vh',
          //   display: 'flex',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          // }}
        />
        {/* <Skeleton animation='wave' height={50} width='90%' /> 
       <Skeleton variant="rounded" animation='wave' height={600} style={{ width: '90%', alignItems: 'center' }} />
       <Placeholder bg='danger' style={{ width: '90%', height: '500px' }} />  */}
      </>
    );
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-start mb-3'>
        <BreadCrumbs />
      </div>
      <div className='text-center'>
        <YearSelect />
      </div>

      <div className='container'>
        <div className='row justify-content-between'>
          <img
            className='d-block col h-50 w-50 mb-3'
            src='/img/retro_poster.png'
          />

          {/* <Drivers home={true} /> */}
          <Table className='table-home col'>
            <TableHead>
              <TableRow className='table-header'>
                <TableCell>Position </TableCell>
                <TableCell>Driver </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='table-body'>
              {drivers.map((driver) => (
                <TableRow
                  key={driver.Driver.driverId}
                  driver={driver}
                  className='table-body'
                >
                  <TableCell className='tableRow-cell p-0'>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
