import React from "react";  
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';    

const TeamsTableRow = (props) => {

return (
    <TableRow>
    <TableCell>{props.teams.position}</TableCell>
    <TableCell>{props.teams.points}</TableCell>
    <TableCell>{props.teams.wins}</TableCell>
    <TableCell>{props.teams.Constructor.name}</TableCell>
  </TableRow>
)

}
export default TeamsTableRow;