import React, { useState, useEffect } from 'react';
import { RiseLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import axios from 'axios';

const Drivers = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const url = 'http://ergast.com/api/f1/2013/driverStandings.json';
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      //   console.log('response', response);
      //   if (response.request.status !== 200) {
      //     throw new Error('Something went wrong!');
      //   }
      const data =
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      console.log(data);
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

  const handleClickDetails = (driverId) => {
    console.log(driverId);
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };

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
      <Table>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Position</TableCell>
            <TableCell>Driver name</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.Driver.driverId}>
              <TableCell>{driver.position}</TableCell>
              <TableCell
                onClick={() => handleClickDetails(driver.Driver.driverId)}
              >
                {driver.Driver.givenName + ' ' + driver.Driver.familyName}
              </TableCell>
              <TableCell>{driver.Constructors[0].name}</TableCell>
              <TableCell>{driver.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Drivers;
