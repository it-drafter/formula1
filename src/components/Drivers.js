import React, { useState, useEffect, useContext } from 'react';
import DriversTableRow from './DriversTableRow';
import { RiseLoader } from 'react-spinners';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Breadcrumbs,
  Link,
} from '@mui/material';
import axios from 'axios';
import GlobalContext from '../context/global-context';
import { useNavigate } from 'react-router-dom';

const Drivers = () => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers();
  }, []);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.-- Drivers');
  }
  const handleBCRoute= () => {
    console.log("klik")
    const linkTo=`/`;
    navigate(linkTo);
  }


  const getDrivers = async () => {
    const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/driverStandings.json`;
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
    );
  }

  return (
    <>
      

      <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="black" onClick={handleBCRoute} className="rucica">
          Home
        </Link>
        <Link
          underline="hover"
          color="text.red"
          className="rucica"
          
        >
          Drivers
        </Link>
        
      </Breadcrumbs>
    </div>



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
    </>
  );
};

export default Drivers;
