import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const QualifyingTableRow = (props) => {

    function qSort() {
        const arr = [props.qualifier.Q1, props.qualifier.Q2, props.qualifier.Q3];
        arr.sort();
        return arr[0];
    }

    return (
        <TableRow>
            <TableCell>{props.qualifier.position}</TableCell>
            <TableCell>
                {props.qualifier.Driver.givenName + ' ' + props.qualifier.Driver.familyName}
            </TableCell>
            <TableCell>{props.qualifier.Constructor.name}</TableCell>
            <TableCell>{qSort() || 'NC'}</TableCell>
        </TableRow>
    );
};

export default QualifyingTableRow;