import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Drivers from "./Drivers";
import Races from "./Races";
import Teams from "./Teams";
import Home from "./Home"


export default function NavBar() {
    return (
        <div>
            <Router>
                <nav className="NavBar">

                    <Link to="/" >Home (logo)</Link>
                    <Link to="/drivers" >Drivers</Link>
                    <Link to="/teams">Teams</Link>
                    <Link to="/races">Races</Link>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/drivers" element={<Drivers />}/>
                        <Route path="/teams" element={<Teams />}/>
                        <Route path="/races" element={<Races />}/>

                    </Routes>
                </nav>
            </Router>
        </div>
    )
} 