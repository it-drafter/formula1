import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import { RiseLoader } from 'react-spinners';
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
    // const urlDriver = `https://raw.githubusercontent.com/nkezic/f1/main/DriverDetails`;
    try {
      const responseDriver = await axios.get(urlDriver);
      setDriverDetails(
        responseDriver.data.MRData.StandingsTable.StandingsLists[0]
          ?.DriverStandings[0]
      );
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
        {/* <RiseLoader
        size={4}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '15px',
        }}
      /> */}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* ,  justifyContent: 'space-between' */}
          {/* <Avatar width={200} height={200} /> */}
          <Skeleton variant='circular' width={50} height={50} />
          <Skeleton
            variant='rounded'
            animation='wave'
            height={50}
            style={{ width: '80%', margin: 20 }}
          />
        </Box>
      </>
    );
  }
  console.log('moj props', props);
  return (
    <>
      <Table
        border='50px solid red'
        size='small'
        sx={{ margin: 0, marginBottom: 5 }}
        className='tableContainer'
      >
        <TableHead>
          <TableRow className='color-wrap'>
            <TableCell>
              <div className='flagName'>
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
