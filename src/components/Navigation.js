import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Drivers from './Drivers';
import Races from './Races';
import Teams from './Teams';
import Home from './Home';
import f1logo3 from '../img/f1logo3.png';
import Kaciga from '../img/Kaciga.png';
import Races2 from '../img/Races2.png';
import Teams1 from '../img/Teams1.png';
import DriverDetails from './DriverDetails';
import TeamDetails from './TeamDetails';

export default function Navigation() {
    return (
        <div className="NavContainer">
            <Router>
                <nav className="NavBar">

                    <Link to='/'>
                        <img src={f1logo3} className='homeimg' />
                    </Link>


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

                    </nav>

                    <Routes>
                        <Route path='/' element={<Home />} />

                        <Route path='/drivers' element={<Drivers />} />
                        <Route path='/drivers/details:driverId' element={<DriverDetails />} />

                        <Route path='/teams' element={<Teams />} />
                        <Route path='/teams/details:teamId' element={<TeamDetails />} />

                        <Route path='/races' element={<Races />} />
                        
                    </Routes>
                
            </Router>
        </div>
    );
}
