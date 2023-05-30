import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
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
  // const navigate = useNavigate();

  const globalCtx = useContext(GlobalContext);
  const searchStringValue = globalCtx.searchStringValue;

  useEffect(() => {
    getDrivers(searchStringValue);
  }, [searchStringValue]);

  const getDrivers = async (searchStringValue) => {
    console.log('hello from search results ', searchStringValue);
    const url = `http://ergast.com/api/f1/drivers.json?limit=1000`;
    // setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.DriverTable.Drivers;
      console.log(data);
      //console.log(data);
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
      //   console.log(err);
      setIsLoading(false);
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
        <BreadCrumbs levels={[['Drivers', '/drivers'], 'Search Drivers']} />
        <SearchBox
          // home={props.home}
          placeholder={'Search Drivers'}
          linkTo={`/drivers/search`}
        />
      </div>
      <h2 className='h2'>Search Results for '{globalCtx.searchStringValue}'</h2>
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
