import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import GlobalContext from '../context/global-context';

const DriverDetailsCollapsable = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [driverDetails, setDriverDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDriverDetails();
  }, []);

  const getDriverDetails = async () => {
    const urlDriver = `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${props.driverId}/driverStandings.json`;
    const responseDriver = await axios.get(urlDriver);
    setDriverDetails(
      responseDriver.data.MRData.StandingsTable.StandingsLists[0]
        ?.DriverStandings[0]
    );
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <RiseLoader
        size={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '15px',
        }}
      />
    );
  }

  return (
    <>
      <Table
        size='small'
        aria-label='purchases'
        sx={{ margin: 0, marginBottom: 5 }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Nationality</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Biography</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {driverDetails?.Driver.nationality}
              {globalCtx.flagFn(driverDetails?.Driver.nationality)}
            </TableCell>
            <TableCell>
              {driverDetails?.Constructors[0].constructorId}
            </TableCell>
            <TableCell>{driverDetails?.Driver.dateOfBirth}</TableCell>
            <TableCell>{driverDetails?.Driver.url}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default DriverDetailsCollapsable;
