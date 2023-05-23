import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

const TeamsTableRow = (props) => {
  const navigate = useNavigate();

  const handleClickConstructor = (teamId) => {
    // console.log("Konstruktor dugme", teamId);
    const LinkTo = `/teams/details/${teamId}`;
    navigate(LinkTo);
  };

  return (
    <TableRow>
      <TableCell>{props.teams.Constructor.name}</TableCell>
      <TableCell>{props.teams.Constructor.url}</TableCell>
      <TableCell>{props.teams.Constructor.nationality}</TableCell>
      <TableCell
        onClick={() =>
          handleClickConstructor(props.teams.Constructor.constructorId)
        }
      >
        {props.teams.Constructor.constructorId}
      </TableCell>
    </TableRow>
  );
};
export default TeamsTableRow;
