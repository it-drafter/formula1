import React, { useState, useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
//import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/global-context';
import DriverDetailsCollapsable from './DriverDetailsCollapsable';

const DriversTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  console.log("props", props)

  const handleClickDetails = (driverId) => {
    console.log(driverId);
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };
  const handleTeamDetails = (teamId) => {
    console.log('on click event');
    const linkTo = `/teams/details/${teamId}`;
    navigate(linkTo);
  };

  // console.log('Props', props.driver.Driver.nationality);
  // console.log('Props111', props);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {props.driver.position}
        </TableCell>
        <TableCell
          onClick={() => handleClickDetails(props.driver.Driver.driverId)}
          className='mouseHandle'
        >
          <div className='flagName'>
            {globalCtx.flagFn(props.driver.Driver.nationality)}
            <span> </span>
            <span> </span>
            {props.driver.Driver.givenName +
              ' ' +
              props.driver.Driver.familyName}
          </div>
        </TableCell>
        <TableCell
          className='mouseHandle'
          onClick={() => handleTeamDetails(props.driver.Constructors[0].constructorId)}
        >
          {props.driver.Constructors[0].name}
        </TableCell>
        <TableCell>{props.driver.points}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 0 }}>
              {/* <Typography variant='h6' gutterBottom component='div'>
                {globalCtx.flagFn(props.driver.Driver.nationality)}
                <span> </span>
                {props.driver.Driver.givenName +
                  ' ' +
                  props.driver.Driver.familyName}
              </Typography> */}
              <DriverDetailsCollapsable
                driverId={props.driver.Driver.driverId}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>

    // <TableRow>
    //   <TableCell
    //     onClick={() => handleClickDetails(props.driver.Driver.driverId)}
    //     className="rucica"
    //   >
    //     <IconButton
    //       aria-label="expand row"
    //       size="small"
    //       onClick={() => setOpen(!open)}
    //       className="rucica"
    //     >
    //       {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    //     </IconButton>
    //   </TableCell>
    //   <TableCell>{props.driver.position}</TableCell>
    //   <TableCell>
    //     {globalCtx.flagFn(props.driver.Driver.nationality)}
    //     {props.driver.Driver.givenName + " " + props.driver.Driver.familyName}
    //   </TableCell>
    //   <TableCell
    //   className="rucica"
    //    onClick={() => handleTeamDetails(props.driver.Driver.driverId)}>{props.driver.Constructors[0].name}</TableCell>
    //   <TableCell>{props.driver.points}</TableCell>
    // </TableRow>
  );
};
export default DriversTableRow;
