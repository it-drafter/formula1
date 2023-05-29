import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import GlobalContext from '../context/global-context';

const ResultsTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
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
        {globalCtx.flagFn(props.result.Constructor.nationality)}
        <span> </span>
        {props.result.Constructor.name}</TableCell>
      <TableCell>
        {props.result.status === 'Finished'
          ? props.result.Time.time
          : props.result.status[0] === '+'
            ? props.result.status
            : 'DNF'}
      </TableCell>
      <TableCell className={'position_' + props.result.position}>
        {props.result.points}
      </TableCell>
    </TableRow>
  );
};

export default ResultsTableRow;
