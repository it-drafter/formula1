import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import {
  Link,
  Breadcrumbs,
} from '@mui/material';
import GlobalContext from '../context/global-context';
import TeamDetailsRaces from './TeamDetailsRaces';

const TeamDetails = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [teamDetails, setTeamDetails] = useState({});
  const [teamResults, setTeamResults] = useState([]);
  // const [teamResultIndex, setTeamResultIndex] = useState(0);
  const [isLoading, setIsLoading] = useState([]);

  const params = useParams();

  const teamId = params.teamId;

  const navigate = useNavigate();

  const handleDrivers = (raceDetails) => {
    console.log('klik na race');
    const linkTo = `/races/details/${raceDetails}`;
    navigate(linkTo);
  };

  useEffect(() => {
    getTeamDetails();
  }, []);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb. -- teamDetails');
  }

  const handleBCRoute = (path) => {
    console.log("klikcic")
    navigate(path)
  }

  const getTeamDetails = async () => {
    const urlDetails = `http://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${teamId}/constructorStandings.json`;
    const urlResults = `http://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${teamId}/results.json`;
    const responseDetails = await axios.get(urlDetails);
    const responseResults = await axios.get(urlResults);

    console.log('test:', responseResults.data.MRData.RaceTable);

    setTeamDetails(
      responseDetails.data.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings[0]
    );
    setTeamResults(responseResults.data.MRData.RaceTable.Races);

    setIsLoading(false);
  };

  if (isLoading) {
    return <RiseLoader />;
  }

  return (
    <>
      
      <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" 
        color="black"
        onClick={()=>handleBCRoute("/")}
        className="rucica" >
          Home
        </Link>
        <Link
          underline="hover"
          color="black"
          onClick={()=>handleBCRoute("/teams")}
          className="rucica"
        >
          Teams
        </Link>
        <Link
          underline="hover"
          color="text.red"
          onClick={()=>handleBCRoute(`/races/details/${raceDetails}`)}
          aria-current="page"
          className="rucica"
        >
          Team Details
        </Link>
      </Breadcrumbs>
    </div>



      <div className='team-details'>
        <div>

          <img src={`/img/teams/${teamDetails.Constructor.constructorId}.webp`}
          style={{width: "400px", paddingRight: "30px"}} alt='Constructor'
           />
        
       
        </div>

        <div>

        

          
          <p className='name-details'>
          {globalCtx.flagFn(teamDetails.Constructor.nationality)}
           <span>  </span>
             {teamDetails.Constructor.name}</p>
          <p>Nationality: {teamDetails.Constructor.nationality}</p>
          <p>Positon: {teamDetails.position}</p>
          <p>Points: {teamDetails.points}</p>
          <p>
            History:{' '}
            <a href={teamDetails.Constructor.url + '#History'} target='_blank'>
              ↗
            </a>
          </p>
        </div>
      </div>
      <TeamDetailsRaces
        teamResults={teamResults}
        handleDrivers={handleDrivers}
      />
    </>
  );
};
export default TeamDetails;
