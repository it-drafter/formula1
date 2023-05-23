import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Drivers from './Drivers';
import Races from './QualifyingResults';
import Teams from './Teams';
import Home from './Home';
import F1logo from '../img/F1-logo.png';
import Kaciga from '../img/Kaciga.png';
import Races3 from '../img/Races3.jpg';
import Teams1 from '../img/Teams1.png';
import DriverDetails from './DriverDetails';
import TeamDetails from './TeamDetails';

export default function Navigation() {
  return (
    <div className='NavContainer'>
      <Router>
        <nav className='NavBar'>
          <Link to='/' className='nav-link-home'>
            <img src={F1logo} className='homeimg' />
          </Link>

          <Link to='/drivers' className='nav-link'>
            <ul>
              {' '}
              <li> Drivers</li>
              <li>
                <img src={Kaciga} className='kaciga' />{' '}
              </li>
            </ul>
          </Link>

          <Link to='/teams' className='nav-link'>
            <ul>
              <li>Teams</li>
              <li>
                {' '}
                <img src={Teams1} className='teams1' />
              </li>
            </ul>
          </Link>

          <Link to='/races' className='nav-link'>
            <ul>
              <li>Races</li>
              <li>
                {' '}
                <img src={Races3} className='races2' />
              </li>{' '}
            </ul>
          </Link>
        </nav>

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
        </Routes>
      </Router>
    </div>
  );
}
