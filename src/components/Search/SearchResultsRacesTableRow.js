import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GlobalContext from '../../context/global-context';
import { useNavigate } from 'react-router-dom';

const SearchResultsRacesTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleClickGrandPrix = (round) => {
    globalCtx.setYearFn(props.race.date.slice(0, 4));
    const LinkTo = `/races/details/${round}`;
    navigate(LinkTo);
  };

  return (
    <>
      <TableRow>
        <TableCell component='th' scope='row'>
          {props.race.date}
        </TableCell>
        <TableCell onClick={() => handleClickGrandPrix(props.race.round)}>
          <div className='flagName mouseHandle tableRow-cell'>
            {globalCtx.flagFn(props.race.Circuit.Location.country)}
            <span> </span>
            <span> </span>
            {props.race.raceName}
          </div>
        </TableCell>
        <TableCell className='details-btn'>
          <a href={props.race.url} target='_blank'>
            <OpenInNewIcon />
          </a>
        </TableCell>
        <TableCell className='tableRow-cell'>
          {props.race.Circuit.circuitName} ({props.race.Circuit.circuitId})
        </TableCell>
        <TableCell className='tableRow-cell'>
          {props.race.Circuit.Location.locality}
        </TableCell>
        <TableCell className='tableRow-cell'>{`${props.race.Results[0].Driver.givenName} ${props.race.Results[0].Driver.familyName} / ${props.race.Results[0].Constructor.name}`}</TableCell>
      </TableRow>
    </>
  );
};
export default SearchResultsRacesTableRow;
