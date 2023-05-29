import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RiseLoader } from 'react-spinners';
import { Link, Breadcrumbs } from '@mui/material';
import GlobalContext from '../context/global-context';
import TeamDetailsRaces from './TeamDetailsRaces';
import BreadCrumbs from './BreadCrumbs';

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
    return (
      <RiseLoader
        style={{
          marginTop: '100px',
        }}
      />
    );
  }

  return (
    <>
      <BreadCrumbs levels={[['Teams', '/teams'], 'Team Details']} />
      

      <div className='team-details'>
        <div>
          <img
            src={`/img/teams/${teamDetails.Constructor.constructorId}.png`}
            // style={{ width: '350px', paddingRight: '30px' }}
            style={{ maxHeight: '100px', paddingRight: '30px' }}
            alt='Constructor'
          />
        </div>

        <div>
          <h2 className='name-details'>
            {globalCtx.flagFn(teamDetails.Constructor.nationality)}
            <span> </span>
            {teamDetails.Constructor.name}
          </h2>
          <p>Nationality: {teamDetails.Constructor.nationality}</p>
          <p>Positon: {teamDetails.position}</p>
          <p>Points: {teamDetails.points}</p>
          <p>
            History:
            <a href={teamDetails.Constructor.url + '#History'} target='_blank'>
              ↗
            </a>
          </p>
        </div>
      </div>
      <div>
        <span>Season {globalCtx.chosenYear}</span>
      </div>
      <TeamDetailsRaces
        teamResults={teamResults}
        handleDrivers={handleDrivers}
      />
    </>
  );
};
export default TeamDetails;
