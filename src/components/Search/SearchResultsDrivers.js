import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import SearchResultsDriversTableRow from './SearchResultsDriversTableRow';
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

const SearchResultsDrivers = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
 

  const globalCtx = useContext(GlobalContext);
  const searchStringValue = globalCtx.searchStringValue;

  useEffect(() => {
    getDrivers(searchStringValue);
  }, [searchStringValue]);

  const getDrivers = async (searchStringValue) => {
    
    const url = `https://ergast.com/api/f1/drivers.json?limit=1000`;
   
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.DriverTable.Drivers;
     
      const filteredData = data.filter((driver) => {
        return (
          driver.familyName
            .toLowerCase()
            .includes(searchStringValue.toLowerCase()) ||
          driver.givenName
            .toLowerCase()
            .includes(searchStringValue.toLowerCase()) ||
          driver.nationality
            .toLowerCase()
            .includes(searchStringValue.toLowerCase())
        );
      });
      setDrivers(filteredData);
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
        <BreadCrumbs levels={[['Drivers', '/drivers'], 'Search Drivers']} />
        <SearchBox
         
          placeholder={'Search Drivers'}
          linkTo={`/drivers/search`}
        />
      </div>
      <h2 className='h2 text-center text-success'>
        Search Results for '{globalCtx.searchStringValue}'
      </h2>
      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell align='left'>Driver name</TableCell>
            <TableCell>Nationality</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Wikipedia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <SearchResultsDriversTableRow
              key={driver.driverId}
              driver={driver}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SearchResultsDrivers;
