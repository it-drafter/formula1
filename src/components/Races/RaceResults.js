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
import ResultsTableRow from './ResultsTableRow';
import GlobalContext from '../../context/global-context';

const RaceResults = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
<<<<<<< HEAD
    const url = `https://raw.githubusercontent.com/nkezic/f1/main/Results`;
    // `http://ergast.com/api/f1/${globalCtx.chosenYear}/${props.round}/results.json`;
    setIsLoading(true);
=======
    // const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/${props.round}/results.json`;
    const url = `https://raw.githubusercontent.com/nkezic/f1/main/Results`;
    // setIsLoading(true);
>>>>>>> 9552baacfbbc505f641bfaf6c2c50d5dedeadafd
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races[0].Results;
      setResults(data);
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
      <h1>Race results component</h1>
      <Table className='tableContainer'>
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
          {results.map((result) => (
            <ResultsTableRow key={result.position} result={result} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default RaceResults;