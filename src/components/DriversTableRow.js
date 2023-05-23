import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const DriversTableRow = (props) => {

    return (
        <TableRow>
            <TableCell>{props.driver.position}</TableCell>
            <TableCell>{props.driver.Driver.givenName + " " + driver.Driver.familyName}</TableCell>
            <TableCell>{props.driver.Constructors[0].name}</TableCell>
            <TableCell>{props.driver.points}</TableCell>
        </TableRow>
    )

}
export default DriversTableRow;