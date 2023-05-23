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

    console.log(
      'test:',
      responseDetails.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings[0]
    );

    setTeamDetails(
      responseDetails.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings
    );
    setTeamResults(responseResults.data.MRData.RaceTable.Races[0]);

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

        <p>Name{teamDetails.Constructor.name}</p>
        <p>Url{teamDetails.Constructor.url}</p>
        <p>Nationality{teamDetails.Constructor.nationality}</p>
      </div>
      <Table>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Position</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Wins</TableCell>
            <TableCell>Constructor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamResults.map((teamResults) => (
            <TableRow key={teamResults.position}>
              <TableCell>{teamResults}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default TeamDetails;
