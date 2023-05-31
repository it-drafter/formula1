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
import GlobalContext from '../../context/global-context';
import CircuitPopup from '../UI/CircuitPopup';
import GrandPrixDetailsCollapse from './GrandPrixDetailsCollapse';

const RacesTableRow = (props) => {
  // console.log('PROPS: ', props.race.Circuit.Location.country)

  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const imageUrl = `/img/circuits/${props.race.Circuit.circuitId}.jpeg`;

  const handleClickGrandPrix = (round) => {
    const LinkTo = `/races/details/${round}`;
    navigate(LinkTo);
  };
  const handleWinnerClick = (driverId) =>{
    console.log("klik na drivera" , props)
    const linkTo = `/drivers/details/${driverId}`
    navigate(linkTo)
  }

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
        <TableCell className='tableRow-cell'>{props.race.round}</TableCell>
        <TableCell
          className='mouseHandle tableRow-cell'
          onClick={() => handleClickGrandPrix(props.race.round)}
        >
          <div className='flagName'>
            {globalCtx.flagFn(props.race.Circuit.Location.country)}
            <span> </span>
            {props.race.raceName}
          </div>
        </TableCell>
        <TableCell className='tableRow-cell'>
          {props.race.Circuit.circuitName}
          <CircuitPopup imageUrl={imageUrl} />
        </TableCell>
        <TableCell className='tableRow-cell'>{props.race.date}</TableCell>
        <TableCell onClick={()=>handleWinnerClick(props.race.Results[0].Driver.driverId)} className='tableRow-cell mouseHandle' >
          <div className='flagName'>
            {globalCtx.flagFn(props.race.Results[0].Driver.nationality)}
            <span> </span>
            {props.race.Results[0].Driver.givenName +
              ' ' +
              props.race.Results[0].Driver.familyName}
          </div>
        </TableCell>
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
              <GrandPrixDetailsCollapse round={props.race.round} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RacesTableRow;
