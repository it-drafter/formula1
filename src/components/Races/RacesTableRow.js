import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/global-context';
import CircuitPopup from '../UI/CircuitPopup';

const RacesTableRow = (props) => {
  // console.log('PROPS: ', props.race.Circuit.Location.country)

  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const imageUrl = `/img/circuits/${props.race.Circuit.circuitId}.jpeg`;

  const handleClickGrandPrix = (round) => {
    const LinkTo = `/racesdetails/${round}`;
    navigate(LinkTo);
  };

  return (
    <TableRow>
      <TableCell className='tableRow-cell'>{props.race.round}</TableCell>
      <TableCell
        className='mouseHandle tableRow-cell'
        onClick={() => handleClickGrandPrix(props.race.round)}
      >
        <div className='flagName'>
          {globalCtx.flagFn(props.race.Circuit.Location.country)}
          <span> </span>
          {props.race.raceName}
        </div>
      </TableCell>
      <TableCell className='tableRow-cell'>
        {props.race.Circuit.circuitName}
        <CircuitPopup imageUrl={imageUrl} />
      </TableCell>
      <TableCell className='tableRow-cell'>{props.race.date}</TableCell>
      <TableCell className='tableRow-cell'>
        <div className='flagName'>
          {globalCtx.flagFn(props.race.Results[0].Driver.nationality)}
          <span> </span>
          {props.race.Results[0].Driver.givenName +
            ' ' +
            props.race.Results[0].Driver.familyName}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RacesTableRow;
