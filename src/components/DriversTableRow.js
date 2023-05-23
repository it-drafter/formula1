import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

const DriversTableRow = (props) => {

    const handleClickDetails = (driverId) => {
        console.log(driverId);
        const linkTo = `/drivers/details/${driverId}`;
        navigate(linkTo);
    };

    const navigate = useNavigate();
    return (
        <TableRow>
            <TableCell>{props.driver.position}</TableCell>
            <TableCell
                onClick={() => handleClickDetails(props.driver.Driver.driverId)}
            >
                {props.driver.Driver.givenName + " " + props.driver.Driver.familyName}
            </TableCell>
            <TableCell>{props.driver.Constructors[0].name}</TableCell>
            <TableCell>{props.driver.points}</TableCell>
        </TableRow>
    )

}
export default DriversTableRow;