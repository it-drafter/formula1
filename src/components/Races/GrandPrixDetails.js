import React, { useState, useEffect, useContext } from 'react';
import RiseLoaderSpinner from '../UI/RiseLoaderSpinner';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import axios from 'axios';
import QualifyingResults from './QualifyingResults';
import RaceResults from './RaceResults';
import SprintShootoutResults from './SprintShootoutResults';
import SprintResults from './SprintResults';
import GlobalContext from '../../context/global-context';
import BreadCrumbs from '../UI/BreadCrumbs';
import Footer from '../UI/Footer';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const GrandPrixDetails = () => {
  const globalCtx = useContext(GlobalContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [grandPrix, setGrandPrix] = useState([]);
  const params = useParams();
  const round = params.round;

  useEffect(() => {
    getGrandPrix();
  }, []);

  const getGrandPrix = async () => {
    const url = `https://ergast.com/api/f1/${globalCtx.chosenYear}/results/1.json`;
    try {
      const response = await axios.get(url);
      const data = response.data.MRData.RaceTable.Races;
      setGrandPrix(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>GrandPrixDetails component Error: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <RiseLoaderSpinner
      // style={{
      //   height: '50vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}
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
      <div className='px-5 w-100 d-flex justify-content-start mb-3'>
        <BreadCrumbs levels={[['Races', '/races'], 'Race Details']} />
      </div>
      <Table className='tableContainer'>
        <TableBody>
          <TableRow>
            <TableCell align='center' colSpan={2}>
              {globalCtx.flagFn(
                grandPrix[round - 1]?.Circuit.Location.country,
                200
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' colSpan={2} className='tableRow-cell'>
              {grandPrix[round - 1].raceName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='tableRow-cell'>Country:</TableCell>
            <TableCell className='tableRow-cell'>
              {grandPrix[round - 1].Circuit.Location.country}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='tableRow-cell'>Location:</TableCell>
            <TableCell className='tableRow-cell'>
              {grandPrix[round - 1].Circuit.Location.locality}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='tableRow-cell'>Date:</TableCell>
            <TableCell className='tableRow-cell'>
              {grandPrix[round - 1].date}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='tableRow-cell'>Grand Prix details:</TableCell>
            <TableCell className='details-btn'>
              <a href={grandPrix[round - 1].url} target='_blank'>
                Wikipedia <OpenInNewIcon />
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='tableRow-cell'>Circuit details:</TableCell>
            <TableCell className='details-btn'>
              <a href={grandPrix[round - 1].Circuit.url} target='_blank'>
                Wikipedia <OpenInNewIcon />
              </a>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align='center' colSpan={2}>
              <iframe src={googleMap}></iframe>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>
        <img
          src={`./img/grand_prix/${globalCtx.chosenYear}/${grandPrix[round - 1].Circuit.circuitId
            }.jpeg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = `./img/grand_prix/poster.png`;
          }}
        />
      </div>
      <SprintShootoutResults round={round} />{' '}
      <SprintResults round={round} />{' '}
      <QualifyingResults round={round} />
      <RaceResults round={round} />
      <Footer />
    </>
  );
};

export default GrandPrixDetails;