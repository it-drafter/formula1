import React, { useState, useEffect, useContext } from 'react';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import axios from 'axios';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import TeamsTableRow from './TeamsTableRow';
import GlobalContext from '../../context/global-context';
import BreadCrumbs from '../UI/BreadCrumbs';
import YearSelect from '../UI/YearSelect';
import SearchBox from '../UI/SearchBox';
import Footer from '../UI/Footer';

const Teams = () => {
  const globalCtx = useContext(GlobalContext);

  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTeams();
  }, [globalCtx.chosenYear]);

  const getTeams = async () => {
    const url = `https://ergast.com/api/f1/${globalCtx.chosenYear}/constructorStandings.json`;
    
    try {
      const response = await axios.get(url);
      const data =
        response.data.MRData.StandingsTable.StandingsLists[0]
          .ConstructorStandings;
      setTeams(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };
  if (error) {
    setError(null);
    setIsLoading(false);
    setTeams([]);
    return (
      <>
        <div className='px-5 w-100 d-flex justify-content-between'>
          <BreadCrumbs levels={[['Teams']]} />
          <SearchBox
            placeholder={'Search Teams'}
            linkTo={`/teams/search`}
          />
        </div>
        <YearSelect />
        <p>Error: {error.message}</p>;
      </>
    );
  }

  if (isLoading) {
    return (
      <RiseLoaderSpinner />
    );
  }

  return (
    <>
      <div className='px-5 w-100 d-flex justify-content-between mb-3'>
        <BreadCrumbs levels={[['Teams']]} />
        <SearchBox
          placeholder={'Search All Teams'}
          linkTo={`/teams/search`}
        />
      </div>

      <div className='text-center'>
        <YearSelect />
      </div>

      <Table className='tableContainer'>
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
      <Footer />
    </>
  );
};

export default Teams;
