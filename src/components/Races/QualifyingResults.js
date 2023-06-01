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
import QualifyingTableRow from './QualifyingTableRow';
import GlobalContext from '../../context/global-context';

const QualifyingResults = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [qualifying, setQualifying] = useState([]);

  useEffect(() => {
    getQualifying();
  }, []);

  const getQualifying = async () => {
    const url = `https://ergast.com/api/f1/${globalCtx.chosenYear}/${props.round}/qualifying.json`;
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races[0].QualifyingResults;
      setQualifying(data);
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
      <h1>Race qualifying component</h1>
      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Pos</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Best Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {qualifying.map((qualifier) => (
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