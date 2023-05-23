import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ResultsTableRow = (props) => {

    // console.log("Props", String(props.Time.time));

    return (
        <TableRow>
            <TableCell>{props.result.position}</TableCell>
            <TableCell>{props.result.Driver.familyName}</TableCell>
            <TableCell>{props.result.Constructor.name}</TableCell>
            <TableCell>{props.result.Time.time}</TableCell>
            <TableCell>{props.result.points}</TableCell>
        </TableRow>
    );
};

export default ResultsTableRow;
