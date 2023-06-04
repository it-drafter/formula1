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
import SprintShootoutTableRow from './SprintShootoutTableRow';
import GlobalContext from '../../context/global-context';

const SprintShootoutResults = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sprintShootout, setSprintShootout] = useState([]);

  useEffect(() => {
    getSprintShootout();
  }, []);

  const getSprintShootout = async () => {
    const url = `./api/f1/${globalCtx.chosenYear}/${props.round}/shootout.json`;
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races[0].ShootoutResults;
      setSprintShootout(data);
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
    return <RiseLoaderSpinner />;
  }

  return (
    <div>
      <h2 className='tableRow-boldCell text-success mt-5 mb-0 mx-auto text-center'>
        Sprint Shootout Results
      </h2>
      <Table className='tableContainer mt-3'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Pos</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Best Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sprintShootout.map((qualifier) => (
            <SprintShootoutTableRow
              key={qualifier.position}
              qualifier={qualifier}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SprintShootoutResults;
