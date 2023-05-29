import React, { useState, useEffect, useContext } from 'react';
import { RiseLoader } from 'react-spinners';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  // Link,
  // Breadcrumbs,
} from '@mui/material';
import TeamsTableRow from './TeamsTableRow';
import GlobalContext from '../context/global-context';
// import { useNavigate } from 'react-router-dom';
import BreadCrumbs from './BreadCrumbs';
import YearSelect from './YearSelect';
import SearchBox from './search/SearchBox';

const Teams = () => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    getTeams();
  }, [globalCtx.chosenYear]);

  // function handleClick(event) {
  //   event.preventDefault();
  //   console.info('You clicked a breadcrumb. -- Teams');
  // }

  // const handleBCRoute = (path) => {
  //   console.log('klikkkklol');
  //   navigate(path);
  // };

  const getTeams = async () => {
    const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/constructorStandings.json`;
    setIsLoading(true);

    try {
      const response = await axios.get(url);
      const data =
        response.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings;
      console.log(data);
      setTeams(data);
      setIsLoading(false);
    } catch (err) {
      setError(err);
    }
  };
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <RiseLoader
        style={{
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-between'>
        <BreadCrumbs levels={[['Teams']]} />
        <SearchBox
          // home={props.home}
          placeholder={'Search Teams'}
          linkTo={`/teams/search`}
        />
      </div>
      {/* <div role='presentation' onClick={handleClick}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link
            underline='hover'
            color='black'
            onClick={() => handleBCRoute('/')}
            className='rucica'
          >
            Home
          </Link>
          <Link
            underline='hover'
            color='text.red'
            onClick={() => handleBCRoute('/teams')}
            className='rucica'
          >
            Teams
          </Link>
        </Breadcrumbs>
      </div> */}
      <YearSelect />

      <Table className='tableContainer bg-transparent'>
        <TableHead className='table-header'>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Team Name</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TeamsTableRow key={team.position} team={team} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Teams;
