import React, { useState, useEffect, useContext } from 'react';
import DriversTableRow from './DriversTableRow';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import axios from 'axios';
import GlobalContext from '../../context/global-context';
import BreadCrumbs from '../UI/BreadCrumbs';
import YearSelect from '../UI/YearSelect';
import SearchBox from '../UI/SearchBox';
import Footer from '../UI/Footer';

const Drivers = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getDrivers();
  }, [globalCtx.chosenYear]);

  const getDrivers = async () => {
    const url = `https://ergast.com/api/f1/${globalCtx.chosenYear}/driverStandings.json`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data =
        response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setDrivers(data);
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
      <>
        <RiseLoaderSpinner />
      </>
    );
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-between mb-3'>
        <BreadCrumbs levels={[['Drivers']]} home={props.home} />

        <SearchBox
          home={props.home}
          placeholder={'Search All Drivers'}
          linkTo={`/drivers/search`}
        />
      </div>

      <div className='text-center'>
        <YearSelect />
      </div>
      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell></TableCell>
            <TableCell>Position</TableCell>
            <TableCell align='left'>Driver name</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <DriversTableRow key={driver.Driver.driverId} driver={driver} />
          ))}
        </TableBody>
      </Table>
      <Footer />
    </>
  );
};

export default Drivers;
