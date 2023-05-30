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
  // const handleDriverClick= (driverId) => {
  //   console.log("klik na drivera")
  //   const linkTo = `/driversdetails/${driverId}`
  //   navigate(linkTo)
  // }
  // onClick={()=> handleDriverClick()}

  return (
    <TableRow>
      <TableCell>{props.qualifier.position}</TableCell>

      <TableCell>
        <div className='flagName'>
          {globalCtx.flagFn(props.qualifier.Driver.nationality)}
          <span> </span>
          {props.qualifier.Driver.givenName +
            ' ' +
            props.qualifier.Driver.familyName}
        </div>
      </TableCell>
      <TableCell>
        <div className='flagName'>
          {globalCtx.flagFn(props.qualifier.Constructor.nationality)}
          <span> </span>
          {props.qualifier.Constructor.name}
        </div>
      </TableCell>
      <TableCell>{qSort() || 'NC'}</TableCell>
    </TableRow>
  );
};

export default QualifyingTableRow;
