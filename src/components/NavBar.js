import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Drivers from './Drivers';
import Races from './Races';
import Teams from './Teams';
import Home from './Home';
import F1logo from '../img/F1-logo.png';
import Kaciga from '../img/Kaciga.png';
import Races2 from '../img/Races2.png';
import Teams1 from '../img/Teams1.png';

export default function NavBar() {
  return (
    <div className='NavContainer'>
      <Router>
        <nav className='NavBar'>
          <Link to='/drivers'>
            Drivers
            <img src={Kaciga} className='kaciga' />
          </Link>

          <Link to='/teams'>
            Teams
            <img src={Teams1} className='teams1' />
          </Link>

          <Link to='/races'>
            Races
            <img src={Races2} className='races2' />
          </Link>

          <Link to='/races'>
            Races
            <img src={Races2} className='races2' />
          </Link>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/drivers' element={<Drivers />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/races' element={<Races />} />
          </Routes>
        </nav>
      </Router>
    </div>
  );
}
