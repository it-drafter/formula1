import React, { useEffect, useState, useContext } from 'react';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import YearSelect from './YearSelect';
import Drivers from './Drivers/Drivers';
import BreadCrumbs from './UI/BreadCrumbs';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import GlobalContext from '../context/global-context';
import DriversTableRow from './Drivers/DriversTableRow';

// import { useContext } from 'react';
// import GlobalContext from '../context/global-context';

const Home = () => {
  // const [reRender, setReRender] = useState(false);
  // const handleReRender = () => {
  //   console.log('rerender');
  //   setReRender(!reRender);
  // };
  const globalCtx = useContext(GlobalContext)
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    getDrivers()
  }, [globalCtx.chosenYear])

  // const [selectYear, setSelecetYear] = useState(null);

  // const handleSelectedYear = (year) => {
  //   console.log('Home component:', year);
  //   // return year;
  // };

  const getDrivers = async () => {

    const urlDrivers = `https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers`;

    const response = await axios.get(urlDrivers);
    console.warn("response", response);
    const data = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    console.log(data, " data")
    setDrivers(data)
  }


  return (
    <>
      <BreadCrumbs />


      {/* <Drivers home={true} /> */}
      <Table className="table-home">
        <TableHead className='table-head'>
          <TableCell>Position: </TableCell>
          <TableCell>Driver: </TableCell>
        </TableHead>
        <TableBody className='table-body'>
          {drivers.map((driver) => (
            <TableRow key={driver.Driver.driverId} driver={driver}>
              <TableCell>{driver.position}</TableCell>
              <TableCell>{driver.Driver.givenName + " " + driver.Driver.familyName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>





    </>
  );
};

export default Home;
