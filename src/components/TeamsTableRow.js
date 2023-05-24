import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

const TeamsTableRow = (props) => {
  const navigate = useNavigate();

  const handleClickConstructor = (teamId) => {
    console.log('Konstruktor dugme', props.team.Constructor.name);
    const LinkTo = `/teams/details/${teamId}`;
    navigate(LinkTo);
  };

  return (
    <TableRow>
      <TableCell>{props.team.position}</TableCell>
      <TableCell
        onClick={() =>
          handleClickConstructor(props.team.Constructor.constructorId)
        }
      >
        {props.team.Constructor.name}
      </TableCell>
      <TableCell>{props.team.Constructor.url}</TableCell>
      <TableCell>{props.team.points}</TableCell>
    </TableRow>
  );
};
export default TeamsTableRow;
