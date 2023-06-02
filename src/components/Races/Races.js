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
import RacesTableRow from './RacesTableRow';
import GlobalContext from '../../context/global-context';
import BreadCrumbs from '../UI/BreadCrumbs';
import YearSelect from '../UI/YearSelect';
import SearchBox from '../UI/SearchBox';
import Footer from '../UI/Footer';

const Races = () => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    getRaces();
  }, [globalCtx.chosenYear]);

  const getRaces = async () => {
    const url = `https://ergast.com/api/f1/${globalCtx.chosenYear}/results/1.json`;
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races;
      setRaces(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>Races component Error: {error.message}</p>;
  }

  if (isLoading) {
    return <RiseLoaderSpinner />;
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-between mb-3'>
        <BreadCrumbs levels={[['Races']]} />
        <SearchBox placeholder={'Search All Races'} linkTo={`/races/search`} />
      </div>

      <div className='text-center'>
        <YearSelect />
      </div>

      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell></TableCell>
            <TableCell>Round</TableCell>
            <TableCell>Grand Prix</TableCell>
            <TableCell>Circuit</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Winner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {races.map((race) => (
            <RacesTableRow key={race.Circuit.circuitId} race={race} />
          ))}
        </TableBody>
      </Table>
      <Footer />
    </>
  );
};

export default Races;
