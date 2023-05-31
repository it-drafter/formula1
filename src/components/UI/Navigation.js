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
    <div className='NavContainer'>
      {/* <Router> */}
      <HashRouter basename='/'>
        <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
          <Container>
            <Link to='/' className='nav-link-home'>
              <img src='./formula1/img/logo.svg' className='homeimg' />
            </Link>

            <NavLink to='/drivers' className='nav-link'>
              <ul>
                <li> Drivers</li>
                <li>
                  <img src='./img/helmet.svg' className='helmet' />
                </li>
              </ul>
            </NavLink>

            <NavLink to='/teams' className='nav-link'>
              <ul>
                <li>Teams</li>
                <li>
                  <img src='./img/bolid.svg' className='teams1' />
                </li>
              </ul>
            </NavLink>

            <NavLink to='/races' className='nav-link'>
              <ul>
                <li>Races</li>
                <li>
                  <img src='./img/raceFlags.svg' className='races2' />
                </li>
              </ul>
            </NavLink>
          </Container>
        </Navbar>

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
    </div>
  );
}
