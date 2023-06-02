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
import CircuitPopup from '../UI/CircuitPopup';
import GrandPrixDetailsCollapse from './GrandPrixDetailsCollapse';

const RacesTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const imageUrl = `./img/circuits/${props.race.Circuit.circuitId}.jpeg`;

  const handleClickGrandPrix = (round) => {
    const LinkTo = `/races/details/${round}`;
    navigate(LinkTo);
  };

  const handleWinnerClick = (driverId) => {
    const linkTo = `/drivers/details/${driverId}`;
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
          <CircuitPopup imageUrl={imageUrl} />
          {props.race.Circuit.circuitName}
        </TableCell>
        <TableCell className='tableRow-cell'>{props.race.date}</TableCell>
        <TableCell
          onClick={() =>
            handleWinnerClick(props.race.Results[0].Driver.driverId)
          }
          className='tableRow-cell mouseHandle'
        >
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 0 }}>
              <GrandPrixDetailsCollapse round={props.race.round} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RacesTableRow;
