import React from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from "react-router-dom";


const TeamsTableRow = (props) => {
  const navigate = useNavigate();

  const handleClickConstructor = (teamId) => {
    console.log("Konstruktor dugme", teamId);
    const linkTo = `/teams${teamId}`;
    navigate(linkTo);


  }

  return (
    <TableRow>
      <TableCell>{props.teams.position}</TableCell>
      <TableCell>{props.teams.points}</TableCell>
      <TableCell>{props.teams.wins}</TableCell>
      <TableCell
        onClick={() => handleClickConstructor(props.teams.Constructor.position)}>{props.teams.Constructor.name}</TableCell>
    </TableRow>
  )

}
export default TeamsTableRow;