import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
    BrowserRouter as Router,
    Route,
    Routes,
   
} from "react-router-dom"

export default function BreadCrumb(props) {
    const location = useLocation();
    
   
<Router>
    <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/drivers' element={<Drivers />} />
          <Route
            path='/drivers/details/:driverId'
            element={<DriverDetails />}
          />
          <Route path='/drivers/details/:race' element={<GrandPrixDetails />} />
          <Route path='/teams/details/:teamId' element={<TeamDetails />} />

          <Route path='/teams' element={<Teams />} />
          <Route path='/teams/details/:teamId' element={<TeamDetails />} />
          <Route
            path='/teams/details/:raceDetails'
            element={<GrandPrixDetails />}
          />

          <Route path='/races' element={<Races />} />
          <Route path='/races/details/:round' element={<GrandPrixDetails />} />
     </Routes>
</Router>
      
    const allRoutes = [
        {path:"/",breadcrumbName: "Home"},
        {path:"/drivers", breadcrumbName:"Drivers"},
        {path:"/teams", breadcrumbName:"Teams"},
        {path:"/races", breadcrumbName:"Races"},
        // {path:"/", breadcrumbName:""},
        // {path:"/", breadcrumbName:""},
        // {path:"/", breadcrumbName:""},
        // {path:"/", breadcrumbName:""},
    ]

    
    const pathname = location.pathname.slice("/")

    console.log("LOCATION", location);
    console.log("PATHS", pathname)


    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }
    const handleBCRoute = (path) => {
        console.log('klikkk');
        navigate(path);
    };


    return (
            <div>
                <div role='presentation' onClick={handleClick} className="BCDiv">
                    <Breadcrumbs aria-label='breadcrumb'>
                        <Link 
                            underline='hover'
                            color='black'
                            onClick={() => handleBCRoute('/')}
                            className='rucica breadCrumb'
                        >
                            Home
                        </Link>
                        <Link
                            underline='hover'
                            color='black'
                            onClick={() => handleBCRoute('/drivers')}
                            className='rucica breadCrumb'
                        >
                            Drivers

                        </Link>
                        <Link
                            underline='hover'
                            onClick={() => handleBCRoute()}
                            className='rucica breadCrumbA'
                            aria-current='page'
                        >
                            Driver Details
                        </Link>
                    </Breadcrumbs>
                </div>
            </div>
    )
}