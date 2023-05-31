import React, { useState, useEffect, useContext } from 'react';
import DriversTableRow from './DriversTableRow';
import { RiseLoader } from 'react-spinners';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  // Breadcrumbs,
  // Link,
} from '@mui/material';
import Placeholder from 'react-bootstrap/Placeholder';
import axios from 'axios';
import GlobalContext from '../../context/global-context';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../UI/BreadCrumbs';
import YearSelect from '../UI/YearSelect';
import SearchBox from '../UI/SearchBox';
import Footer from '../UI/Footer';

const Drivers = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  // const [reRender, setReRender] = useState(false);
  // const handleReRender = () => {
  //   console.log('rerender');
  //   setReRender(!reRender);
  // };

  useEffect(() => {
    getDrivers();
  }, [globalCtx.chosenYear]);

  // const handleBCRoute = () => {
  //   console.log('klik');
  //   const linkTo = `/`;
  //   navigate(linkTo);
  // };

  const getDrivers = async () => {
    // const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/driverStandings.json`;
    const url = `https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      //   console.log('response', response);
      //   if (response.request.status !== 200) {
      //     throw new Error('Something went wrong!');
      //   }
      const data =
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      //console.log(data);
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
      <RiseLoader
        style={{
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      // <>
      //   {/* <Skeleton animation='wave' height={50} width='90%' />
      //   <Skeleton animation='wave' height={500} style={{ width: '90%' }} />

      //   <Placeholder bg='danger' style={{ width: '90%', height: '500px' }} /> */}
      // </>
    );
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-between'>
        <BreadCrumbs levels={[['Drivers']]} home={props.home} />
        <SearchBox
          home={props.home}
          placeholder={'Search All Drivers'}
          linkTo={`/formula1/drivers/search`}
        />
      </div>

      <YearSelect />

      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell></TableCell>
            <TableCell>Position</TableCell>
            <TableCell align='left'>Driver name</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <DriversTableRow key={driver.Driver.driverId} driver={driver} />
          ))}
        </TableBody>
      </Table>
      <Footer />
    </>
  );
};

export default Drivers;
