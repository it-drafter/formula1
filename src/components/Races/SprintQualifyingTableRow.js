import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import GlobalContext from '../../context/global-context';
import { useNavigate } from 'react-router-dom';

const SprintQualifyingTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  function qSort() {
    const arr = [props.qualifier.Q1, props.qualifier.Q2, props.qualifier.Q3];
    arr.sort();
    return arr[0];
  }
  const navigate = useNavigate()
  const handleRouteDrivers= (driverId) => {
    console.log("driver click");
    const linkTo=`/drivers/details/${driverId}`
    navigate(linkTo);
  }
  const handleRouteTeams = (teamId) => {
    console.log("klik na team")
    const linkTo= `/teams/details/${teamId}`;
    navigate(linkTo);
  }
  console.log("props", props)



  return (
    <TableRow>
      <TableCell>{props.qualifier.position}</TableCell>
      <TableCell onClick={()=> handleRouteDrivers(props.qualifier.Driver.driverId)} className="mouseHandle">
        <div className='flagName'>
          {globalCtx.flagFn(props.qualifier.Driver.nationality)}
          <span> </span>
          {props.qualifier.Driver.givenName +
            ' ' +
            props.qualifier.Driver.familyName}
        </div>
      </TableCell>
      <TableCell onClick={()=> handleRouteTeams(props.qualifier.Constructor.constructorId)} className="mouseHandle">
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

export default SprintQualifyingTableRow;
