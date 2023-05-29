import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import GlobalContext from '../context/global-context';

const ResultsTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);

  const classFunction = (position, points) => {
    if (position === "1") {
      return 'gold';
    } else if (position === "2") {
      return 'silver';
    } else if (position === "3") {
      return 'bronze';
    } else if (points > '0') {
      return 'green';
    } else
      return 'gray';
  };

  return (
    <TableRow>
      <TableCell>{props.result.position}</TableCell>
      <TableCell>
        <div className="flagName">
          {globalCtx.flagFn(props.result.Driver.nationality)}
          <span> </span>
          {props.result.Driver.givenName + ' ' + props.result.Driver.familyName}
        </div>
      </TableCell>
      <TableCell>
        <div className="flagName">
          {globalCtx.flagFn(props.result.Constructor.nationality)}
          <span> </span>
          {props.result.Constructor.name}
        </div>
      </TableCell>
      <TableCell>
        {props.result.status === 'Finished'
          ? props.result.Time.time
          : props.result.status[0] === '+'
            ? props.result.status
            : 'DNF'}
      </TableCell>
      {/* <TableCell className={'position_' + props.result.position}> */}
      <TableCell className={classFunction(props.result.position, props.result.points)}>
        {props.result.points}
      </TableCell>
    </TableRow>
  );
};

export default ResultsTableRow;