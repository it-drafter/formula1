import React, { useState, useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/global-context';
import DriverDetailsCollapsable from './DriverDetailsCollapsable';

const DriversTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickDetails = (driverId) => {
    console.log("klik na drivera", driverId);
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };
  const handleTeamDetails = (teamId) => {
    const linkTo = `/teams/details/${teamId}`;
    navigate(linkTo);
  };
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
        <TableCell component='th' scope='row' className='tableRow-cell'>
          {props.driver.position}
        </TableCell>
        <TableCell
          onClick={() => handleClickDetails(props.driver.Driver.driverId)}
          className='mouseHandle tableRow-cell'
        >
          <div className='flagName'>
            {globalCtx.flagFn(props.driver.Driver.nationality)}
            <span> </span>

            {props.driver.Driver.givenName +
              ' ' +
              props.driver.Driver.familyName}
          </div>
        </TableCell>
        <TableCell
          className='mouseHandle tableRow-cell'
          onClick={() =>
            handleTeamDetails(props.driver.Constructors[0].constructorId)
          }
        >
          <div className='flagName'>
            {globalCtx.flagFn(props.driver.Constructors[0].nationality)}
            <span> </span>

            {props.driver.Constructors[0].name}
          </div>
        </TableCell>
        <TableCell className='tableRow-cell'>{props.driver.points}</TableCell>
      </TableRow>

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
      </TableRow>
    </>
  );
};
export default DriversTableRow;
