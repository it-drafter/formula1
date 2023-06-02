import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import SearchResultsRacesTableRow from './SearchResultsRacesTableRow';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import SearchBox from '../UI/SearchBox';
import BreadCrumbs from '../UI/BreadCrumbs';
import GlobalContext from '../../context/global-context';

const SearchResultsRaces = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [races, setRaces] = useState([]);

  const globalCtx = useContext(GlobalContext);
  const searchStringValue = globalCtx.searchStringValue;

  useEffect(() => {
    getRaces(searchStringValue);
  }, [searchStringValue]);

  const getRaces = async (searchStringValue) => {
    const url1 = `https://ergast.com/api/f1/results/1.json?limit=1000`;
    const url2 = `https://ergast.com/api/f1/results/1.json?limit=1000&offset=1000`;

    try {
      const response1 = await axios.get(url1);
      const response2 = await axios.get(url2);
      const data1 = response1.data.MRData.RaceTable.Races;
      const data2 = response2.data.MRData.RaceTable.Races;
      const allData = [...data1, ...data2];

      const filteredData = allData.filter((race) => {
        return (
          race.season.toLowerCase().includes(searchStringValue.toLowerCase()) ||
          race.raceName
            .toLowerCase()
            .includes(searchStringValue.toLowerCase()) ||
          race.Circuit.circuitName
            .toLowerCase()
            .includes(searchStringValue.toLowerCase()) ||
          race.Circuit.Location.locality
            .toLowerCase()
            .includes(searchStringValue.toLowerCase()) ||
          race.Circuit.circuitId
            .toLowerCase()
            .includes(searchStringValue.toLowerCase()) ||
          race.Circuit.Location.country
            .toLowerCase()
            .includes(searchStringValue.toLowerCase())
        );
      });
      setRaces(filteredData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <RiseLoaderSpinner />;
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-between'>
        <BreadCrumbs levels={[['Races', '/races'], 'Search Races']} />
        <SearchBox placeholder={'Search Races'} linkTo={`/races/search`} />
      </div>
      <h2 className='h2 text-center text-success'>
        Search Results for '{globalCtx.searchStringValue}'
      </h2>
      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell align='left'>Date</TableCell>
            <TableCell>Race Name</TableCell>
            <TableCell>Wikipedia</TableCell>
            <TableCell>Circuit Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Winner / Team</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {races.map((race) => (
            <SearchResultsRacesTableRow key={race.date} race={race} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SearchResultsRaces;
