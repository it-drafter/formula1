import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/global-context';

const RacesTableRow = (props) => {
  // console.log('PROPS: ', props.race.Circuit.Location.country)

  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClickGrandPrix = (round) => {
    const LinkTo = `/races/details/${round}`;
    navigate(LinkTo);
  };

  return (
    <TableRow>
      <TableCell>{props.race.round}</TableCell>
      <TableCell
        className='mouseHandle'
        onClick={() => handleClickGrandPrix(props.race.round)}
      >
        {globalCtx.flagFn(props.race.Circuit.Location.country)}
        <span> </span>
        {props.race.raceName}
      </TableCell>
      <TableCell>{props.race.Circuit.circuitName}</TableCell>
      <TableCell>{props.race.date}</TableCell>
      <TableCell>
        {globalCtx.flagFn(props.race.Results[0].Driver.nationality)}
        <span> </span>
        {props.race.Results[0].Driver.givenName +
          ' ' +
          props.race.Results[0].Driver.familyName}
      </TableCell>
    </TableRow>
  );
};

export default RacesTableRow;
