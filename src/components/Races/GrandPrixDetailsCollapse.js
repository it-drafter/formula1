import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
//import { RiseLoader } from 'react-spinners';
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
    // const url = `https://raw.githubusercontent.com/nkezic/f1/main/Results`;
    try {
      const response = await axios.get(url);
      setGrandPrixDetails(response.data.MRData.RaceTable.Races);
      setIsLoading(false);
    } catch (err) {
      //   console.log(err);
      setIsLoading(false);
      setError(err);
    }
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return (
      // <RiseLoader
      //   size={4}
      //   style={{
      //     display: 'flex',
      //     justifyContent: 'center',
      //     marginBottom: '15px',
      //   }}
      // />
      <>
        <Skeleton
          variant='rounded'
          animation='wave'
          height={200}
          style={{ width: '90%', margin: 20 }}
        />
      </>
    );
  }
  console.log('moj props', props);
  return (
    <>
      <Table
        border='50px solid red'
        size='small'
        sx={{ margin: 0, marginBottom: 5 }}
        className='tableContainer'
      >
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Winner Team</TableCell>
            <TableCell>Grand Prix details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className='flagName'>
                {globalCtx.flagFn(
                  grandPrixDetails[props.round - 1]?.Circuit.Location.country
                )}

                <span> </span>

                {grandPrixDetails[props.round - 1]?.Circuit.Location.country}
              </div>
            </TableCell>
            <TableCell>
              {grandPrixDetails[props.round - 1].Circuit.Location.locality}
            </TableCell>
            <TableCell>
              {grandPrixDetails[props.round - 1].Results[0].Constructor.name}
            </TableCell>
            <TableCell>
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
