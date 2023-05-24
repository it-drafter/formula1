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

const TeamDetails = (props) => {
  const [teamDetails, setTeamDetails] = useState({});
  const [teamResults, setTeamResults] = useState([]);
  // const [teamResultIndex, setTeamResultIndex] = useState(0);
  const [isLoading, setIsLoading] = useState([]);

  const params = useParams();

  const teamId = params.teamId;

  useEffect(() => {
    getTeamDetails();
  }, []);

  const getTeamDetails = async () => {
    const urlDetails = `http://ergast.com/api/f1/2013/constructors/${teamId}/constructorStandings.json`;
    const urlResults = `http://ergast.com/api/f1/2013/constructors/${teamId}/results.json`;
    const responseDetails = await axios.get(urlDetails);
    const responseResults = await axios.get(urlResults);

    console.log('test:', responseResults.data.MRData.RaceTable);

    setTeamDetails(
      responseDetails.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings[0]
    );
    setTeamResults(responseResults.data.MRData.RaceTable.Races);

    setIsLoading(false);
  };



  if (isLoading) {
    return <RiseLoader />;
  }


  return (
    <>
      {' '}
      <div>
        <h1>Team Details</h1>

        <p>Name: {teamDetails.Constructor.name}</p>
        <p>Nationality: {teamDetails.Constructor.nationality}</p>
        <p>Positon: {teamDetails.position}</p>
        <p>Points: {teamDetails.points}</p>
        <p>Url: {teamDetails.Constructor.url}</p>
      </div>
      <Table>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Round</TableCell>
            <TableCell>Race Name</TableCell>
            <TableCell>{teamResults[0].Results[0].Driver.familyName}</TableCell>
            <TableCell>{teamResults[0].Results[1].Driver.familyName}</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamResults.map((teamResult) => {
            return (

              <TableRow key={teamResult.round}>
                <TableCell>{teamResult.round}</TableCell>
                <TableCell>{teamResult.raceName}</TableCell>
                <TableCell
                  className={"position_" + teamResult.Results[0].position}>

                  {teamResult.Results[0].position}</TableCell>
                <TableCell


                  className={"position_" + teamResult.Results[1].position} >


                  {teamResult.Results[1].position}</TableCell>

                <TableCell >
                  {Number(teamResult.Results[0].points) +
                    Number(teamResult.Results[1].points)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default TeamDetails;
