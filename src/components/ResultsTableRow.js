import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ResultsTableRow = (props) => {

  return (
    <TableRow>
      <TableCell>{props.result.position}</TableCell>
      <TableCell>{props.result.Driver.givenName + ' ' + props.result.Driver.familyName}</TableCell>
      <TableCell>{props.result.Constructor.name}</TableCell>
      <TableCell>
        {props.result.status === 'Finished'
          ? props.result.Time.time
          : props.result.status[0] === '+'
            ? props.result.status
            : 'DNF'}
      </TableCell>
      <TableCell className={'position_' + props.result.position}>{props.result.points}</TableCell>
    </TableRow>
  );
};

export default ResultsTableRow;