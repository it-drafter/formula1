import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Avatar,
  Box,
} from '@mui/material';
import GlobalContext from '../../context/global-context';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const DriverDetailsCollapsable = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [driverDetails, setDriverDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDriverDetails();
  }, []);

  const getDriverDetails = async () => {
    const urlDriver = `https://ergast.com/api/f1/${globalCtx.chosenYear}/drivers/${props.driverId}/driverStandings.json`;
    try {
      const responseDriver = await axios.get(urlDriver);
      setDriverDetails(
        responseDriver.data.MRData.StandingsTable.StandingsLists[0]
          ?.DriverStandings[0]
      );
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant='circular' width={50} height={50} />
        <Skeleton
          variant='rounded'
          animation='wave'
          height={50}
          style={{ width: '80%', margin: 20 }}
        />
      </Box>
    );
  }
  return (
    <>
      <Table
        border='50px solid red'
        size='small'
        padding='0px'
        sx={{ margin: 0, marginBottom: 5 }}
        className='tableContainer'
      >
        <TableHead>
          <TableRow className='color-wrap'>
            <TableCell>
              <div className='flagName tableRow-cell'>
                {globalCtx.flagFn(driverDetails?.Driver.nationality)}

                <span> </span>

                {' ' +
                  driverDetails.Driver.givenName +
                  ' ' +
                  driverDetails.Driver.familyName}
              </div>
            </TableCell>
            <TableCell className='tableRow-cell'>Nationality</TableCell>
            <TableCell className='tableRow-cell'>Wins</TableCell>
            <TableCell className='tableRow-cell'>Date of Birth</TableCell>
            <TableCell className='tableRow-cell'>Biography</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className='color-wrap'>
            <TableCell>
              <img
                src={`./img/drivers/${driverDetails.Driver.driverId}.png`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = `./img/drivers/unknownDriver.png`;
                }}
                style={{ width: '120px', paddingRight: '30px' }}
                alt='Driver'
              />
            </TableCell>
            <TableCell className='tableRow-cell'>{driverDetails?.Driver.nationality}</TableCell>
            <TableCell className='tableRow-cell'>{driverDetails?.wins}</TableCell>
            <TableCell className='tableRow-cell'>{driverDetails?.Driver.dateOfBirth}</TableCell>
            <TableCell className='details-btn'>
              <a href={driverDetails?.Driver.url} target='_blank'>
                Wikipedia <OpenInNewIcon />
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default DriverDetailsCollapsable;
