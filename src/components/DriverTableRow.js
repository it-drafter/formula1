import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const DriverTableRow = (props) => {
  return (
    <TableRow>
      <TableCell>{props.driver.position}</TableCell>
      <TableCell>{props.driver.Driver.familyName}</TableCell>
      <TableCell>{props.driver.points}</TableCell>
      <TableCell>{props.driver.wins}</TableCell>
    </TableRow>
  );
};

export default DriverTableRow;
