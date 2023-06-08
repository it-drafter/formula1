import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import Stack from '@mui/material/Stack';
import GlobalContext from '../../context/global-context';
import TeamDetailsRaces from './TeamDetailsRaces';
import BreadCrumbs from '../UI/BreadCrumbs';
import Footer from '../UI/Footer';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import YearSelect from '../UI/YearSelect';

const TeamDetails = (props) => {
  const globalCtx = useContext(GlobalContext);

  const [teamDetails, setTeamDetails] = useState({});
  const [teamResults, setTeamResults] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();

  const teamId = params.teamId;

  const navigate = useNavigate();

  const handleDrivers = (raceDetails) => {
    const linkTo = `/races/details/${raceDetails}`;
    navigate(linkTo);
  };

  useEffect(() => {
    getTeamDetails();
  }, [globalCtx.chosenYear]);

  const getTeamDetails = async () => {
    setIsLoading(true);
    setError(null);
    const urlDetails = `https://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${teamId}/constructorStandings.json`;
    const urlResults = `https://ergast.com/api/f1/${globalCtx.chosenYear}/constructors/${teamId}/results.json`;
    try {
      const responseDetails = await axios.get(urlDetails);
      const responseResults = await axios.get(urlResults);

      setTeamDetails(
        responseDetails.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings[0]
      );
      setTeamResults(responseResults.data.MRData.RaceTable.Races);

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return (
      <>
        <div className='px-5 w-100 d-flex justify-content-start mb-3'>
          <BreadCrumbs levels={[['Teams', '/teams'], 'Team Details']} />
        </div>
        <h2 className='tableRow-boldCell text-success mt-5 mb-3 mx-auto text-center'>
          No data for team {teamId} in season {globalCtx.chosenYear}
        </h2>
        <h2 className='tableRow-boldCell text-success mb-3 mx-auto text-center'>
          Choose another season.
        </h2>
        <div className='text-center'>
          <YearSelect />
        </div>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return <RiseLoaderSpinner />;
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-start mb-3'>
        <BreadCrumbs levels={[['Teams', '/teams'], 'Team Details']} />
      </div>

      <div className='text-center'>
        <YearSelect />
      </div>

      <Stack
        direction={{ sm: 'column', md: 'row' }}
        spacing={2}
        m={5}
        alignItems='flex-start'
      >
        <Table className='table-const-race'>
          <TableBody className='detailsBody'>
            <TableRow>
              <TableCell align='center' colSpan={2} className='tableRow-cell'>
                <img
                  src={`./img/teams/${teamDetails.Constructor.constructorId}.png`}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `./img/teams/unknownConstructor.png`;
                  }}
                  style={{ maxHeight: '100px' }}
                  alt='Constructor'
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className='flagName tableRow-boldCell'
                colSpan={2}
                align='center'
              >
                {globalCtx.flagFn(teamDetails.Constructor.nationality)}
                <span> </span>
                {teamDetails.Constructor.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className='tableRow-cell'>
                Nationality:
              </TableCell>
              <TableCell align='center' className='tableRow-cell'>
                {teamDetails.Constructor.nationality}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className='tableRow-cell'>
                Position:
              </TableCell>
              <TableCell align='center' className='tableRow-cell'>
                {teamDetails.position}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className='tableRow-cell'>
                Points:
              </TableCell>
              <TableCell align='center' className='tableRow-cell'>
                {teamDetails.points}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='center' className='tableRow-cell'>
                History:
              </TableCell>
              <TableCell align='center' className='details-btn'>
                {' '}
                <a
                  href={teamDetails.Constructor.url + '#History'}
                  target='_blank'
                >
                  Wikipedia <OpenInNewIcon />
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <TableBody>
          <TeamDetailsRaces
            teamResults={teamResults}
            handleDrivers={handleDrivers}
          />
        </TableBody>
      </Stack>
      <Footer />
    </>
  );
};
export default TeamDetails;
