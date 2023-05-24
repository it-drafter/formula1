import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';

const TeamsTableRow = (props) => {
  const navigate = useNavigate();

  const handleClickConstructor = (teamId) => {
  
    const LinkTo = `/teams/details/${teamId}`;
    navigate(LinkTo);
  };

  const handleClickDetails = () => {
    console.log("detalji", props.team.Constructor.url )
   const site = props.team.Constructor.url
   navigate(site);
  }

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
      <TableCell onClick={handleClickDetails}>
       Details ↗</TableCell>
      <TableCell>{props.team.points}</TableCell>
    </TableRow>
  );
};
export default TeamsTableRow;
