import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

const RacesTableRow = (props) => {
    const navigate = useNavigate();

    const handleClickGrandPrix = (round) => {
        const LinkTo = `/races/details/${round}`;
        navigate(LinkTo);
    };

    console.log("komentar u zagradi" , props.race.raceName)

    return (
        <TableRow>
            <TableCell>{props.race.round}</TableCell>
            <TableCell onClick={() => handleClickGrandPrix(props.race.round)} race={props.race}>
                {props.race.raceName}
            </TableCell>
            <TableCell>{props.race.Circuit.circuitName}</TableCell>
            <TableCell>{props.race.date}</TableCell>
            <TableCell>{props.race.Results[0].Driver.familyName}</TableCell>
        </TableRow>
    );
};

export default RacesTableRow;