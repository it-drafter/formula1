import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const QualifyingTableRow = (props) => {
  //   console.log('Q:', Date(props.qualifier.Q2));
  //   const maxDate = new Date(Math.max(...dates));

  function qCalculator() {
    const arr = [];

    arr.push(props.qualifier.Q1);

    // if (props.qualifier.Q2 !== undefined) {
    arr.push(props.qualifier.Q2);
    // }
    // if (props.qualifier.Q3 !== undefined) {
    arr.push(props.qualifier.Q3);
    // }
    // console.log('testing', Date.parse(Date(props.qualifier.Q3)));

    arr.sort((a, b) => a - b);

    // const fastest = Math.min(...arr);

    // const date = new Date(fastest);

    // const dateFormat =
    //   date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString();

    return arr[0];
  }
  //   qCalculator();

  return (
    <TableRow>
      <TableCell>{props.qualifier.position}</TableCell>
      <TableCell>
        {props.qualifier.Driver.givenName +
          ' ' +
          props.qualifier.Driver.familyName}
      </TableCell>
      <TableCell>{props.qualifier.Constructor.name}</TableCell>
      <TableCell>{qCalculator() || 'nema'}</TableCell>
    </TableRow>
  );
};

export default QualifyingTableRow;
