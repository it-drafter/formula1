import React, { useContext }from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/global-context';

const TeamsTableRow = (props) => {

  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClickConstructor = (teamId) => {

    const LinkTo = `/teams/details/${teamId}`;
    navigate(LinkTo);
  };

  // const handleClickDetails = () => {
  //   console.log("detalji", props.team.Constructor.url )
  //  const site = props.team.Constructor.url
  //  navigate(site);


  return (
    <TableRow>
      <TableCell>{props.team.position}</TableCell>
      <TableCell


        onClick={() =>
          handleClickConstructor(props.team.Constructor.constructorId)
        }
        className="rucica"
      >
        {globalCtx.flagFn(props.team.Constructor.nationality)}
        <span>  </span>
        {props.team.Constructor.name}
      </TableCell>
      <TableCell > <a href={props.team.Constructor.url} target="_blank" >Details ↗</a>
      </TableCell>
      <TableCell>{props.team.points}</TableCell>
    </TableRow>
  );
};
export default TeamsTableRow;
