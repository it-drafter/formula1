import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Skeleton from '@mui/material/Skeleton';
import GlobalContext from '../../context/global-context';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const GrandPrixDetailsCollapse = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [grandPrixDetails, setGrandPrixDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGrandPrixDetails();
  }, []);

  const getGrandPrixDetails = async () => {
    const url = `https://ergast.com/api/f1/${globalCtx.chosenYear}/results/1.json`;
    try {
      const response = await axios.get(url);
      setGrandPrixDetails(response.data.MRData.RaceTable.Races);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return (
      <>
        <Skeleton
          variant='rounded'
          animation='wave'
          height={50}
          style={{ width: '95%', margin: 20 }}
        />
      </>
    );
  }

  return (
    <>
      <Table
        border='50px solid red'
        size='small'
        sx={{ margin: 0, marginBottom: 5 }}
        className='tableContainer'
      >
        <TableHead>
          <TableRow className='color-wrap'>
            <TableCell className='tableRow-cell'>Country</TableCell>
            <TableCell className='tableRow-cell'>Location</TableCell>
            <TableCell className='tableRow-cell'>Winner Team</TableCell>
            <TableCell className='tableRow-cell'>Grand Prix details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className='color-wrap'>
            <TableCell>
              <div className='flagName tableRow-cell'>
                {globalCtx.flagFn(
                  grandPrixDetails[props.round - 1]?.Circuit.Location.country
                )}
                <span> </span>
                {grandPrixDetails[props.round - 1]?.Circuit.Location.country}
              </div>
            </TableCell>
            <TableCell className='tableRow-cell'>
              {grandPrixDetails[props.round - 1].Circuit.Location.locality}
            </TableCell>
            <TableCell className='tableRow-cell'>
              {grandPrixDetails[props.round - 1].Results[0].Constructor.name}
            </TableCell>
            <TableCell className='details-btn'>
              <a href={grandPrixDetails[props.round - 1].url} target='_blank'>
                Wikipedia <OpenInNewIcon />
              </a>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default GrandPrixDetailsCollapse;
