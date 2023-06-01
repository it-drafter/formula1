import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import GlobalContext from '../../context/global-context';
import { useNavigate } from 'react-router-dom';

const QualifyingTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();

  function qSort() {
    const arr = [props.qualifier.Q1, props.qualifier.Q2, props.qualifier.Q3];
    arr.sort();
    return arr[0];
  }

  const handleDriverClick = (driverId) => {
    console.log("klik na drivera")
    const linkTo = `/drivers/details/${driverId}`
    navigate(linkTo)
  }

  const handleTeamClick = (round) => {
    console.log("klik na tim")
    const linkTo = `/teams/details/${round}`;
    navigate(linkTo)
  }

  return (
    <TableRow>
      <TableCell className='tableRow-cell'>{props.qualifier.position}</TableCell>
      <TableCell className='mouseHandle' onClick={() => handleDriverClick(props.qualifier.Driver.driverId)}>
        <div className='flagName tableRow-cell'>
          {globalCtx.flagFn(props.qualifier.Driver.nationality)}
          <span> </span>
          {props.qualifier.Driver.givenName +
            ' ' +
            props.qualifier.Driver.familyName}
        </div>
      </TableCell>
      <TableCell onClick={() => handleTeamClick(props.qualifier.Constructor.constructorId)} className="mouseHandle">
        <div className='flagName tableRow-cell'>
          {globalCtx.flagFn(props.qualifier.Constructor.nationality)}
          <span> </span>
          {props.qualifier.Constructor.name}
        </div>
      </TableCell>
      <TableCell className='tableRow-cell'>{qSort() || 'NC'}</TableCell>
    </TableRow>
  );
};

export default QualifyingTableRow;