import React from 'react';

const Drivers = (props) => {
 
    return (
      <>
        <h1>Drivers</h1>
         <table>
          <tbody>
            {props.drivers.map(driver=>
              <tr key={driver.id}>
                <td>driver.StandingsTable.StandingsLists.DriverStandings.position</td>
                <td>driver.StandingsTable.StandingsLists.DriverStandings.Driver.givenName</td>
                <td>driver.StandingsTable.StandingsLists.DriverStandings.Driver.familyName</td>
                <td>driver.StandingsTable.StandingsLists.DriverStandings.points</td>
              </tr>
              )}
          </tbody>
        </table>
      </>
    );
  };
  
 

export default Drivers;







import React from 'react';
import NavBar from './components/NavBar';
import Drivers from './components/Drivers';

const App = () => {

const [posts, setPosts] = useState([]);


     useEffect(() => {
        getPosts();
    }, [])

     const getPosts = async () => {
         const url1= "https://ergast.com/api/f1/2013/driverStandings.json";

        let response1 = await axios.get(url1);
        setPosts(response1.data);
         
    }

  return (
    <>
      <h1>Formula 1</h1>
      <NavBar />
      <Drivers />
    </>
  );
};

export default App;












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CircleLoader from "react-spinners";
// import Posts from "./components/Posts";

// const App = (props) => {

//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//        getPosts();
//     }, [])

//     const getPosts = async () => {
//         const url= "https://jsonplaceholder.typicode.com/posts";

//         const response = await axios.get(url);
//         setPosts(response.data);
//         setLoading(false);
//     }

//     return(
//         <div>
//             <Posts posts={posts}/>
//         </div>
//     );
// }

// export default App;