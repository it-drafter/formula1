import React, { useState, useEffect, useContext } from 'react';
import DriversTableRow from './DriversTableRow';
import { RiseLoader } from 'react-spinners';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import axios from 'axios';
import GlobalContext from '../context/global-context';

const Drivers = () => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getDrivers();
  }, []);

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
      <h1>Drivers component</h1>
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
