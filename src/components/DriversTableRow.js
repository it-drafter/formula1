import React, { useState, useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/global-context';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const DriversTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickDetails = (driverId) => {
    console.log(driverId);
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };
  const handleTeamDetails = (teamId) => {
    console.log('on click event');
    const linkTo = `/drivers/details/${teamId}`;
    navigate(linkTo);
  };

  // console.log('Props', props.driver.Driver.nationality);

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
          className='rucica'
        >
          {globalCtx.flagFn(props.driver.Driver.nationality)}
          {props.driver.Driver.givenName + ' ' + props.driver.Driver.familyName}
        </TableCell>
        <TableCell
          className='rucica'
          onClick={() => handleTeamDetails(props.driver.Driver.driverId)}
        >
          {props.driver.Constructors[0].name}
        </TableCell>
        <TableCell>{props.driver.points}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Header 1</TableCell>
                    <TableCell>Header 2</TableCell>
                    <TableCell>Header 3</TableCell>
                    <TableCell>Header 4</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Data 1</TableCell>
                    <TableCell>Data 2</TableCell>
                    <TableCell>Data 3</TableCell>
                    <TableCell>Data 4</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
