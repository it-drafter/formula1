import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import SearchResultsTeamsTableRow from './SearchResultsTeamsTableRow';
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

const SearchResultsTeams = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);


  const globalCtx = useContext(GlobalContext);
  const searchStringValue = globalCtx.searchStringValue;

  useEffect(() => {
    getTeams(searchStringValue);
  }, [searchStringValue]);

  const getTeams = async (searchStringValue) => {
   
    const url = `https://ergast.com/api/f1/constructors.json?limit=1000`;
  
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.ConstructorTable.Constructors;
  
      const filteredData = data.filter((team) => {
        return (
          team.name.toLowerCase().includes(searchStringValue.toLowerCase()) ||
          team.nationality
            .toLowerCase()
            .includes(searchStringValue.toLowerCase())
        );
      });
      setTeams(filteredData);
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
    return (
      <RiseLoaderSpinner
    
      />
    );
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-between'>
        <BreadCrumbs levels={[['Teams', '/teams'], 'Search Teams']} />
        <SearchBox
         
          placeholder={'Search Teams'}
          linkTo={`/teams/search`}
        />
      </div>
      <h2 className='h2 text-center text-success'>
        Search Results for '{globalCtx.searchStringValue}'
      </h2>
      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell align='left'>Team name</TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Wikipedia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <SearchResultsTeamsTableRow key={team.constructorId} team={team} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SearchResultsTeams;
