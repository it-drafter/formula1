import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const QualifyingTableRow = (props) => {
    return (
        <TableRow>
            <TableCell>{props.race.round}</TableCell>
            <TableCell>{props.race.raceName}</TableCell>
            <TableCell>{props.race.Circuit.circuitName}</TableCell>
            <TableCell>{props.race.date}</TableCell>
            <TableCell>{props.race.Results[0].Driver.familyName}</TableCell>
        </TableRow>
    );
};

export default QualifyingTableRow;