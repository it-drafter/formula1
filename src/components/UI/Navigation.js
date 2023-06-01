import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import Drivers from '../Drivers/Drivers';
import Races from '../Races/Races';
import Teams from '../Teams/Teams';
import Home from '../Home';
import F1logo from '../../img/logo.svg';
import Helmet from '../../img/helmet.svg';
import Races3 from '../../img/raceFlags.svg';
import Teams1 from '../../img/bolid.svg';
// import backdrop from '../../img/home-backdrop.jpg';
import DriverDetails from '../Drivers/DriverDetails';
import TeamDetails from '../Teams/TeamDetails';
import GrandPrixDetails from '../Races/GrandPrixDetails';
import SearchResultsDrivers from '../Search/SearchResultsDrivers';
import SearchResultsTeams from '../Search/SearchResultsTeams';
import SearchResultsRaces from '../Search/SearchResultsRaces';

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
      <HashRouter basename='/'>
        {/ <div styles={{ backgroundImage: `url(${backdrop})` }}> /}
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
                <img src='./img/logo.svg' className='homeimg' />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav style={{ fontFamily: 'formulaBold', margin: 'auto' }}>
                <NavLink to='/drivers' className='nav-link text-center'>
                  <h2 className='mb-4'>Drivers</h2>
                  <div>
                    <img src='./img/driver.svg' className='helmet' />
                  </div>
                </NavLink>

                <NavLink to='/teams' className='nav-link text-center'>
                  <h2 className='mb-4'>Teams</h2>
                  <div>
                    <img src='./img/bolid.svg' className='teams1' />
                  </div>
                </NavLink>

                <NavLink to='/races' className='nav-link text-center'>
                  <h2 className='mb-4'>Races</h2>
                  <div>
                    <img src='./img/raceFlags.svg' className='races2' />
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
    </>
  );
}