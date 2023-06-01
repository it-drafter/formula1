import React, { useState, useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
//import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/global-context';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// import DriverDetailsCollapsable from './DriverDetailsCollapsable';

const SearchResultsDriversTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // console.log('Props', props.driver.nationality);
  // console.log('Props111', props);

  const handleClickDetails = (driverId) => {
    console.log('search klik ', driverId);
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };
  // console.log("props", props)
  return (
    <>
      <TableRow>
        <TableCell
          component='th'
          scope='row'
          onClick={() => handleClickDetails(props.driver.driverId)}
          className='mouseHandle tableRow-cell'
        >
          {`${props.driver.givenName} ${props.driver.familyName}`}
        </TableCell>
        <TableCell
        //   onClick={() => handleClickDetails(props.driver.Driver.driverId)}
        //   className='rucica'
        >
          <div className='flagName tableRow-cell'>
            {globalCtx.flagFn(props.driver.nationality)}
            <span> </span>
            {props.driver.nationality}
          </div>
        </TableCell>
        <TableCell className='tableRow-cell'>{props.driver.dateOfBirth}</TableCell>
        <TableCell className='details-btn'>
          <a href={props.driver.url} target='_blank'>
            <OpenInNewIcon />
          </a>
        </TableCell>
      </TableRow>
      {/* 
      <TableRow>
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
