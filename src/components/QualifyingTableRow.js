import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import GlobalContext from '../context/global-context';

const QualifyingTableRow = (props) => {
    const globalCtx = useContext(GlobalContext);
    function qSort() {
        const arr = [props.qualifier.Q1, props.qualifier.Q2, props.qualifier.Q3];
        arr.sort();
        return arr[0];
    }

    return (
        <TableRow>
            <TableCell>{props.qualifier.position}</TableCell>
            <TableCell>
                {globalCtx.flagFn(props.qualifier.Constructor.nationality)}
                <span> </span>
                {props.qualifier.Driver.givenName + ' ' + props.qualifier.Driver.familyName}
            </TableCell>
            <TableCell>{props.qualifier.Constructor.name}</TableCell>
            <TableCell>{qSort() || 'NC'}</TableCell>
        </TableRow>
    );
};

export default QualifyingTableRow;