import React, { useState, useEffect, useContext } from 'react';
import { RiseLoader } from 'react-spinners';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import axios from 'axios';
import SprintQualifyingTableRow from './SprintQualifyingTableRow';
import GlobalContext from '../../context/global-context';

const SprintQualifyingResults = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sprintQualifying, setSprintQualifying] = useState([]);

  useEffect(() => {
    getSprintQualifying();
  }, []);

  const getSprintQualifying = async () => {
    // const url = `/api/f1/${globalCtx.chosenYear}/${props.round}/qualifying.json`;
    const url = `https://raw.githubusercontent.com/nkezic/f1/main/Qualifiers`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races[0].QualifyingResults;
      setSprintQualifying(data);
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
      <h1>Sprint qualifying component</h1>
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
          {sprintQualifying.map((qualifier, index) => (
            <SprintQualifyingTableRow
              key={qualifier.position}
              qualifier={qualifier}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SprintQualifyingResults;
