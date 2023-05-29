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
import QualifyingTableRow from './QualifyingTableRow';
import GlobalContext from '../context/global-context';

const QualifyingResults = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qualifying, setQualifying] = useState([]);

  useEffect(() => {
    getQualifying();
  }, []);

  const getQualifying = async () => {
    const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/${props.round}/qualifying.json`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races[0].QualifyingResults;
      setQualifying(data);
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
<<<<<<< HEAD
      <h1>Race Qualifying component</h1>
      <Table>
=======
      <h1>Qualifying component</h1>
      <Table className='tableContainer bg-transparent'>
>>>>>>> b58308f3f061f78b8e8fee44f29d0da627053bf5
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Pos</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Best Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {qualifying.map((qualifier, index) => (
            <QualifyingTableRow
              key={qualifier.position}
              qualifier={qualifier}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default QualifyingResults;
