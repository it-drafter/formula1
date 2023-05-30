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
          <Link to='/' className='nav-link-home'>
            <img src={F1logo} className='homeimg' />
          </Link>

          <NavLink to='/drivers' className='nav-link'>
            <ul>
              <li> Drivers</li>
              <li>
                <img src={Kaciga} className='kaciga' />
              </li>
            </ul>
          </NavLink>

          <NavLink to='/teams' className='nav-link'>
            <ul>
              <li>Teams</li>
              <li>
                <img src={Teams1} className='teams1' />
              </li>
            </ul>
          </NavLink>

          <NavLink to='/races' className='nav-link'>
            <ul>
              <li>Races</li>
              <li>
                <img src={Races3} className='races2' />
              </li>
            </ul>
          </NavLink>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/drivers' element={<Drivers />} />
          <Route path='/driversdetails/:driverId' element={<DriverDetails />} />

          <Route path='/teams' element={<Teams />} />
          <Route path='/teamsdetails/:teamId' element={<TeamDetails />} />

          <Route path='/races' element={<Races />} />
          <Route path='/racesdetails/:round' element={<GrandPrixDetails />} />

          <Route path='/drivers/search' element={<SearchResultsDrivers />} />
          <Route path='/teams/search' element={<SearchResultsTeams />} />
          <Route path='/races/search' element={<SearchResultsRaces />} />
        </Routes>
      </Router>
    </div>
  );
}
