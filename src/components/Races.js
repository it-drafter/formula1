import React, { useState, useEffect, useContext } from 'react';
import { RiseLoader } from 'react-spinners';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  // Link,
  // Breadcrumbs,
} from '@mui/material';
import axios from 'axios';
import RacesTableRow from './RacesTableRow';
import GlobalContext from '../context/global-context';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from './BreadCrumbs';
import YearSelect from './YearSelect';
import SearchBox from './search/SearchBox';

const Races = () => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [races, setRaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRaces();
  }, [globalCtx.chosenYear]);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  const handleBCRoute = () => {
    console.log('klikj');
    const linkTo = '/';
    navigate(linkTo);
  };

  const getRaces = async () => {
    const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/results/1.json`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races;
      setRaces(data);
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
      <div className='px-5 w-100 d-flex justify-content-between'>
        <BreadCrumbs levels={[['Races']]} />
        <SearchBox
          // home={props.home}
          placeholder={'Search Races'}
          linkTo={`/races/search`}
        />
      </div>
    
      <YearSelect />

      <Table className='tableContainer bg-transparent'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Round</TableCell>
            <TableCell>Grand Prix</TableCell>
            <TableCell>Circuit</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Winner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {races.map((race, index) => (
            <RacesTableRow key={race.Circuit.circuitId} race={race} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Races;
