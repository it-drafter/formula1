import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import GlobalContext from '../context/global-context';

const TeamDetailsCollapsable = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [teamDetails, setTeamDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTeamDetails();
  }, []);

  const getTeamDetails = async () => {
    const urlDetails = `http://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${props.teamId}/constructorStandings.json`;
    const responseDetails = await axios.get(urlDetails);
    setTeamDetails(
      responseDetails.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings[0]
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
            <TableCell>Team Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              {globalCtx.flagFn(teamDetails.Constructor.nationality)}
              <span> </span>
              {teamDetails.Constructor.name}
            </TableCell>
            <TableCell>{teamDetails.Constructor.nationality}</TableCell>
            <TableCell>{teamDetails.position}</TableCell>
            <TableCell>{teamDetails.points}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default TeamDetailsCollapsable;