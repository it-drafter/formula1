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
    const url = `/api/f1/${globalCtx.chosenYear}/${props.round}/shootout.json`;
    // setIsLoading(true);
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
    // return <p>SprintShootoutResults component Error: {error.message}</p>;
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
      <h1>Sprint shootout component</h1>
      <Table>
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
    </>
  );
};

export default SprintShootoutResults;
