import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import { RiseLoader } from 'react-spinners';
import {
Table,
TableHead,
TableBody,
TableRow,
TableCell,
Skeleton} from '@mui/material';
import GlobalContext from '../../context/global-context';

const TeamDetailsCollapsable = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [teamDetails, setTeamDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTeamDetails();
  }, []);

  const getTeamDetails = async () => {
    const urlDetails = `https://raw.githubusercontent.com/nkezic/f1/main/TeamDetails`;
    // const urlDetails = `http://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${props.teamId}/constructorStandings.json`;
    try {
      const responseDetails = await axios.get(urlDetails);
      setTeamDetails(
        responseDetails.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings[0]
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
      // <RiseLoader
      //   size={4}
      //   style={{
      //     display: 'flex',
      //     justifyContent: 'center',
      //     marginBottom: '15px',
      //   }}
      // />
      <>
        <Skeleton variant="rounded" animation='wave' height={300} style={{ width: '95%', margin: 20, alignContent: 'center'}}/>
        </>
    );
  }

  return (
    <>
      <Table
        size='small'
        aria-label='purchases'
        sx={{ margin: 0, marginBottom: 5 }}
        className='tableContainer'
      >
        <TableHead>
          <TableRow>
            <TableCell>Team Name</TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Wins</TableCell>
            {/* <TableCell>Points</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className='flagName'>
                {globalCtx.flagFn(teamDetails.Constructor.nationality)}
                <span> </span>
                {teamDetails.Constructor.name}
              </div>
            </TableCell>
            <TableCell>{teamDetails.Constructor.nationality}</TableCell>
            <TableCell>{teamDetails.wins}</TableCell>
            {/* <TableCell>{teamDetails.points}</TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default TeamDetailsCollapsable;
