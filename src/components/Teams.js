import React, { useState, useEffect, useContext } from 'react';
import { RiseLoader } from 'react-spinners';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import TeamsTableRow from './TeamsTableRow';
import GlobalContext from '../context/global-context';

const Teams = () => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/constructorStandings.json`;
    setIsLoading(true);

    try {
      const response = await axios.get(url);
      const data =
        response.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings;
      console.log(data);
      setTeams(data);
      setIsLoading(false);
    } catch (err) {
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
      <h1>Teams component</h1>
      <Table>
        <TableHead className='table-header'>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Team Name</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TeamsTableRow key={team.position} team={team} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Teams;
