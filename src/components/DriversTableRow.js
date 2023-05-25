import React, { useState, useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/global-context';

const DriversTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleClickDetails = (driverId) => {
    console.log(driverId);
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };

  // console.log('Props', props.driver.Driver.nationality);

  return (
    <TableRow>
      <TableCell
        onClick={() => handleClickDetails(props.driver.Driver.driverId)}
      >
        <IconButton
          aria-label='expand row'
          size='small'
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell>{props.driver.position}</TableCell>
      <TableCell>
        {globalCtx.flagFn(props.driver.Driver.nationality)}
        {props.driver.Driver.givenName + ' ' + props.driver.Driver.familyName}
      </TableCell>
      <TableCell>{props.driver.Constructors[0].name}</TableCell>
      <TableCell>{props.driver.points}</TableCell>
    </TableRow>
  );
};
export default DriversTableRow;
