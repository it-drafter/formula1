import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const DriverDetails = () => {
  const [driverDetails, setDriverDetails] = useState([]);
  const [driverDetailsRaces, setDriverDetailsRaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  // console.log('DriverDetails', params.driverId);
  const driverId = params.driverId;

  useEffect(() => {
    getDriverDetails();
  }, []);

  const getDriverDetails = async () => {
    // console.log('DriverDetails', params.driverId);
    // const driverId = params.driverId;
    const urlDriver = `https://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`;
    const urlRaces = `http://ergast.com/api/f1/2013/drivers/${driverId}/results.json`;
    const responseDriver = await axios.get(urlDriver);
    const responseRaces = await axios.get(urlRaces);
    setDriverDetails(
      responseDriver.data.MRData.StandingsTable.StandingsLists[0]
        .DriverStandings[0]
    );
    setDriverDetailsRaces(responseRaces.data.MRData.RaceTable.Races);
    setIsLoading(false);
  };

  if (isLoading) {
    return <RiseLoader />;
  }

  console.log(driverDetailsRaces);

  return (
    <>
      <div>
        <h2>Driver details</h2>
        <p>Nationality: {driverDetails.Driver.nationality}</p>
        <p>Team: {driverDetails.Constructors[0].constructorId}</p>
        <p>Date of Birth: {driverDetails.Driver.dateOfBirth}</p>
        <p>Biography: {driverDetails.Driver.url}</p>
      </div>
      <Table>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Round</TableCell>
            <TableCell>Grand Prix</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Grid</TableCell>
            <TableCell>Race</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {driverDetailsRaces.map((DetailRace) => (
            <TableRow key={DetailRace.round}>
              <TableCell>{DetailRace.round}</TableCell>
              <TableCell>{DetailRace.raceName}</TableCell>
              <TableCell>
                {DetailRace.Results[0].Constructor.constructorId}
              </TableCell>
              <TableCell>{DetailRace.Results[0].grid}</TableCell>
              <TableCell className={"position_" + DetailRace.Results[0].position}>
                {DetailRace.Results[0].position}
             
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DriverDetails;

// const DriverDetails = () => {
//   const params = useParams();
//   console.log('DriverDetails', params.driverId);
//   return (
//     <>
//       <h1>Driver Details</h1>
//       <h2>{params.driverId}</h2>
//     </>
//   );
// };

// export default DriverDetails;
