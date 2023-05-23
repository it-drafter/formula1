import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const QualifyingTableRow = (props) => {
    return (
        <TableRow>
            <TableCell>{props.qualifier.position}</TableCell>
            <TableCell>{props.qualifier.Driver.givenName + ' ' + props.qualifier.Driver.familyName}</TableCell>
            <TableCell>{props.qualifier.Constructor.name}</TableCell>
            <TableCell>
                {props.qualifier.Q3}</TableCell>
        </TableRow>
    );
};

export default QualifyingTableRow;