import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Drivers from '../Drivers/Drivers';
import Races from '../Races/Races';
import Teams from '../Teams/Teams';
import Home from '../Home';
import F1logo from '../../img/f1-logo-big.png';
import Kaciga from '../../img/Kaciga.png';
import Races3 from '../../img/Races3.jpg';
import Teams1 from '../../img/Teams1.png';
import DriverDetails from '../Drivers/DriverDetails';
import TeamDetails from '../Teams/TeamDetails';
import GrandPrixDetails from '../Races/GrandPrixDetails';
import SearchResultsDrivers from '../Search/SearchResultsDrivers';
import SearchResultsTeams from '../Search/SearchResultsTeams';
import SearchResultsRaces from '../Search/SearchResultsRaces';

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
      <Router>
        <nav className='NavBar'>
          <Link to='/formula1' className='nav-link-home'>
            <img src={F1logo} className='homeimg' />
          </Link>

          <NavLink to='/formula1/drivers' className='nav-link'>
            <ul>
              <li> Drivers</li>
              <li>
                <img src={Kaciga} className='kaciga' />
              </li>
            </ul>
          </NavLink>

          <NavLink to='/formula1/teams' className='nav-link'>
            <ul>
              <li>Teams</li>
              <li>
                <img src={Teams1} className='teams1' />
              </li>
            </ul>
          </NavLink>

          <NavLink to='/formula1/races' className='nav-link'>
            <ul>
              <li>Races</li>
              <li>
                <img src={Races3} className='races2' />
              </li>
            </ul>
          </NavLink>
        </nav>

        <Routes>
          <Route path='/formula1' element={<Home />} />

          <Route path='/formula1/drivers' element={<Drivers />} />
          <Route
            path='/formula1/drivers/details/:driverId'
            element={<DriverDetails />}
          />

          <Route path='/formula1/teams' element={<Teams />} />
          <Route
            path='/formula1/teams/details/:teamId'
            element={<TeamDetails />}
          />

          <Route path='/formula1/races' element={<Races />} />
          <Route path='/races/details/:round' element={<GrandPrixDetails />} />

          <Route
            path='/formula1/drivers/search'
            element={<SearchResultsDrivers />}
          />
          <Route
            path='/formula1/teams/search'
            element={<SearchResultsTeams />}
          />
          <Route
            path='/formula1/races/search'
            element={<SearchResultsRaces />}
          />
        </Routes>
      </Router>
    </div>
  );
}
