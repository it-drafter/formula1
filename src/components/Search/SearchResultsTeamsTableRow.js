import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
//import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/global-context';
// import DriverDetailsCollapsable from './DriverDetailsCollapsable';

const SearchResultsDriversTableRow = (props) => {
const globalCtx = useContext(GlobalContext);
const [open, setOpen] = useState(false);
const navigate = useNavigate();

  // console.log('Props', props.driver.nationality);
  // console.log('Props111', props);

  //   const handleClickDetails = (driverId) => {
  //     console.log(driverId);
  //     const linkTo = `/drivers/details/${driverId}`;
  //     navigate(linkTo);
  //   };

  return (
    <>
      <TableRow>
        <TableCell
          component='th'
          scope='row'
          //   onClick={() => handleClickDetails(props.driver.driverId)}
          //   className='rucica'
        >
          {props.team.name}
        </TableCell>
        <TableCell
        //   onClick={() => handleClickDetails(props.driver.Driver.driverId)}
        //   className='rucica'
        >
          <div className='flagName'>
             {globalCtx.flagFn(props.driver.Driver.nationality)}
            <span> </span>
            <span> </span>
            {props.team.nationality}
          </div>
        </TableCell>
        <TableCell>
          <a href={props.team.url} target='_blank' >↗</a></TableCell>
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
export default SearchResultsDriversTableRow;
