import React, { useState, useEffect, useContext } from 'react';
import { RiseLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  // Link,
  // Breadcrumbs,
} from '@mui/material';
import axios from 'axios';
import QualifyingResults from './QualifyingResults';
import RaceResults from './RaceResults';
import SprintQualifyingResults from './SprintQualifyingResults';
import SprintResults from './SprintResults';
import GlobalContext from '../context/global-context';
// import { useNavigate } from 'react-router-dom';
import BreadCrumbs from './BreadCrumbs';

const GrandPrixDetails = () => {
  const globalCtx = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [grandPrix, setGrandPrix] = useState([]);
  // const navigate = useNavigate();

  const params = useParams();
  const round = params.round;

  useEffect(() => {
    getGrandPrix();
  }, []);

  const getGrandPrix = async () => {
    const url = `http://ergast.com/api/f1/${globalCtx.chosenYear}/results/1.json`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races;
      setGrandPrix(data);
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

  const lat = grandPrix[round - 1].Circuit.Location.lat;
  const long = grandPrix[round - 1].Circuit.Location.long;
  const googleMap =
    'https://maps.google.com/maps?q=' +
    lat +
    ',' +
    long +
    '&hl=en&z=14&output=embed';

  return (
    <>
      <BreadCrumbs levels={[['Races', '/races'], 'Race Details']} />


      <Table className='tableContainer'>
        <TableBody>
          <TableRow>
            <TableCell>
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  {globalCtx.flagFn(
                    grandPrix[round - 1]?.Circuit.Location.country
                  )}
                
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  {grandPrix[round - 1].raceName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Country:</TableCell>
                <TableCell>
                  {grandPrix[round - 1].Circuit.Location.country}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Location:</TableCell>
                <TableCell>
                  {grandPrix[round - 1].Circuit.Location.locality}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Date:</TableCell>
                <TableCell>{grandPrix[round - 1].date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Grand Prix details:</TableCell>
                <TableCell>
                  <a href={grandPrix[round - 1].url} target='_blank'>
                    Wikipedia ↗
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Circuit details:</TableCell>
                <TableCell>
                  <a href={grandPrix[round - 1].Circuit.url} target='_blank'>
                    Wikipedia ↗
                  </a>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  <iframe src={googleMap}></iframe>
                </TableCell>
              </TableRow>
            </TableCell>
            <TableCell>
              <img
                style={{ maxHeight: '600px' }}
                src={`/img/grand_prix/${globalCtx.chosenYear}/${grandPrix[round - 1].Circuit.circuitId
                  }.jpeg`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `/img/neutral.svg`;
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <SprintQualifyingResults round={round} />
      <SprintResults round={round} />
      <QualifyingResults round={round} />
      <RaceResults round={round} />
    </>
  );
};

export default GrandPrixDetails;