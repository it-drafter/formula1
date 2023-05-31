import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
//import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// import GlobalContext from '../context/global-context';
// import DriverDetailsCollapsable from './DriverDetailsCollapsable';

const SearchResultsRacesTableRow = (props) => {
  //   const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // console.log('Props', props.driver.nationality);
  // console.log('Props111', props);

  //   const handleClickDetails = (driverId) => {
  //     console.log(driverId);
  //     const linkTo = `/drivers/details/${driverId}`;
  //     navigate(linkTo);
  //   };
  //   console.log('SEARCH PROPS: ', props);
  return (
    <>
      <TableRow>
        <TableCell
          component='th'
          scope='row'
          //   onClick={() => handleClickDetails(props.driver.driverId)}
          //   className='rucica'
        >
          {props.race.date}
        </TableCell>
        <TableCell
        //   onClick={() => handleClickDetails(props.driver.Driver.driverId)}
        //   className='rucica'
        >
          <div className='flagName'>
            {/* {globalCtx.flagFn(props.driver.Driver.nationality)} */}
            <span> </span>
            <span> </span>
            {props.race.raceName}
          </div>
        </TableCell>
        <TableCell>
          <a href={props.race.url} target='_blank'><OpenInNewIcon/></a></TableCell>
        <TableCell>
          {props.race.Circuit.circuitName} ({props.race.Circuit.circuitId})
        </TableCell>
        <TableCell>{props.race.Circuit.Location.locality}</TableCell>
        <TableCell>{`${props.race.Results[0].Driver.givenName} ${props.race.Results[0].Driver.familyName} / ${props.race.Results[0].Constructor.name}`}</TableCell>
      </TableRow>

      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <DriverDetailsCollapsable
              driverId={props.driver.Driver.driverId}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </>
  );
};
export default SearchResultsRacesTableRow;
