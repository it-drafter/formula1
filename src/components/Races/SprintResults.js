import React, { useState, useEffect, useContext } from 'react';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import axios from 'axios';
import SprintResultsTableRow from './SprintResultsTableRow';
import GlobalContext from '../../context/global-context';

const SprintResults = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sprintResults, setSprintResults] = useState([]);

  useEffect(() => {
    getSprintResults();
  }, []);

  const getSprintResults = async () => {
    const url = `https://ergast.com/api/f1/${globalCtx.chosenYear}/${props.round}/sprint.json`;
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races[0].SprintResults;
      setSprintResults(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return false;
  }

  if (isLoading) {
    return (
      <RiseLoaderSpinner
        // style={{
        //   height: '50vh',
        //   display: 'flex',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // }}
      />
    );
  }

  return (
    <>
      <h1>Sprint results component</h1>
      <Table>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Pos</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sprintResults.map((result) => (
            <SprintResultsTableRow key={result.position} result={result} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SprintResults;