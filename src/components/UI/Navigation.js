import React, { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, NavLink, HashRouter } from 'react-router-dom';
import Drivers from '../Drivers/Drivers';
import Races from '../Races/Races';
import Teams from '../Teams/Teams';
import Home from '../Home';
// import backdrop from '../../img/home-backdrop.jpg';
import DriverDetails from '../Drivers/DriverDetails';
import TeamDetails from '../Teams/TeamDetails';
import GrandPrixDetails from '../Races/GrandPrixDetails';
import SearchResultsDrivers from '../Search/SearchResultsDrivers';
import SearchResultsTeams from '../Search/SearchResultsTeams';
import SearchResultsRaces from '../Search/SearchResultsRaces';
import Tooltip from '@mui/material/Tooltip';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {
  // const [isActive, setIsActive] = useState(false);
  // const ToggleClass = () => {
  //     setIsActive(!isActive)
  // }
  // useEffect(() => {
  //   return () => {
  //     setIsActive(isActive)

  //   };
  // }, []);

  return (
    <>
      {/* <Router> */}
      <HashRouter basename='/'>
        {/* <div style={{ backgroundImage: `url(${backdrop})` }}> */}
        <div>
          <Navbar
            collapseOnSelect
            expand='lg'
            bg='dark'
            variant='dark'
            className='NavContainer'
          >
            <Navbar.Brand>
              <Link to='/' className='nav-link-home'>
                {/* <Tooltip
                  placement='right'
                  title='Home'
                  className='tooltip-home'
                  arrow
                > */}
                <img src='./img/logo.png' className='homeimg' />
                {/* </Tooltip> */}
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav style={{ fontFamily: 'formulaBold', margin: 'auto' }}>
                <NavLink to='/drivers' className='nav-link text-center'>
                  <h2 className='mb-4'>Drivers</h2>
                  <div>
                    {/* <Tooltip title='All Drivers' placement='top' arrow> */}
                    <img
                      src='./img/drivers.png'
                      className='helmet'
                      alt='drivers'
                    />
                    {/* </Tooltip> */}
                  </div>
                </NavLink>

                <NavLink to='/teams' className='nav-link text-center'>
                  <h2 className='mb-4'>Teams</h2>
                  <div>
                    {/* <Tooltip title='All Teams' placement='top' arrow> */}
                    <img src='./img/bolid.png' className='teams1' alt='teams' />
                    {/* </Tooltip> */}
                  </div>
                </NavLink>

                <NavLink to='/races' className='nav-link text-center'>
                  <h2 className='mb-4'>Races</h2>
                  <div>
                    {/* <Tooltip title='All Races' placement='top' arrow> */}
                    <img
                      src='./img/raceFlags.png'
                      className='races2'
                      alt='races'
                    />
                    {/* </Tooltip> */}
                  </div>
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/drivers' element={<Drivers />} />
          <Route
            path='/drivers/details/:driverId'
            element={<DriverDetails />}
          />

          <Route path='/teams' element={<Teams />} />
          <Route path='/teams/details/:teamId' element={<TeamDetails />} />

          <Route path='/races' element={<Races />} />
          <Route path='/races/details/:round' element={<GrandPrixDetails />} />

          <Route path='/drivers/search' element={<SearchResultsDrivers />} />
          <Route path='/teams/search' element={<SearchResultsTeams />} />
          <Route path='/races/search' element={<SearchResultsRaces />} />
        </Routes>
      </HashRouter>
      {/* </Router> */}
    </>
  );
}
