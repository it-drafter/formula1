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
import { useNavigate } from 'react-router-dom';
import Flag from 'react-flagkit';

const DriverDetails = (props) => {
  const [driverDetails, setDriverDetails] = useState([]);
  const [driverDetailsRaces, setDriverDetailsRaces] = useState([]);
  const [flags, setFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const handleRouteToGrandPrix = (race) => {
    console.log('komentar');
    const linkTo = `/races/details/${race}`;
    navigate(linkTo);
  };

  // console.log('DriverDetails', params.driverId);
  const driverId = params.driverId;

  // const getFlags = async () => {
  //   const urlFlags = 'https://flagcdn.com/en/codes.json';
  //   const responseFlags = await axios.get(urlFlags);
  //   console.log("response", responseFlags);

  //   setFlags (responseFlags.data.data);
  //   // console.log("ZASTAVICE", flags);
  // }

  useEffect(() => {
    getDriverDetails();
  }, []);

  const getDriverDetails = async () => {
    // console.log('DriverDetails', params.driverId);
    // const driverId = params.driverId;
    const urlDriver = `https://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`;
    const urlRaces = `http://ergast.com/api/f1/2013/drivers/${driverId}/results.json`;
    const urlFlags =
      'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json';
    const responseDriver = await axios.get(urlDriver);
    const responseRaces = await axios.get(urlRaces);
    const responseFlags = await axios.get(urlFlags);
    // console.log('responseFlags', responseFlags.data);

    setDriverDetails(
      responseDriver.data.MRData.StandingsTable.StandingsLists[0]
        .DriverStandings[0]
    );
    setDriverDetailsRaces(responseRaces.data.MRData.RaceTable.Races);
    setFlags(responseFlags.data);
    setIsLoading(false);
  };

  const getFlagCode = (nationality) => {
    const country = flags.filter((flag) => flag.nationality === nationality);
    // console.log('nationality:', nationality);
    console.log('flags:', flags);
    console.log('country:', country[0].alpha_2_code);
    return country[0].alpha_2_code;
  };

  if (isLoading) {
    return <RiseLoader />;
  }

  // console.log(driverDetailsRaces);

  return (
    <>
      <div className='driverDetails'>
        <div>
          <h2>Driver details</h2>
          <p>
            Nationality: {driverDetails.Driver.nationality}
            <Flag country={getFlagCode(driverDetails.Driver.nationality)} />
          </p>
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
                <TableCell
                  onClick={() => handleRouteToGrandPrix(DetailRace.round)}
                >
                  {DetailRace.raceName}
                </TableCell>
                <TableCell>
                  {DetailRace.Results[0].Constructor.constructorId}
                </TableCell>
                <TableCell>{DetailRace.Results[0].grid}</TableCell>
                <TableCell
                  className={'position_' + DetailRace.Results[0].position}
                >
                  {DetailRace.Results[0].position}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
