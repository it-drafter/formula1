import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import GlobalContext from '../../context/global-context';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

const SearchResultsDriversTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleTeamDetails = (teamId) => {
    const LinkTo = `/teams/details/${teamId}`;
    navigate(LinkTo);
  };

  return (
    <>
      <TableRow>
        <TableCell
          component='th'
          scope='row'
          className='mouseHandle tableRow-cell'
          onClick={() => handleTeamDetails(props.team.constructorId)}
        >
          {props.team.name}
        </TableCell>
        <TableCell>
          <div className='flagName tableRow-cell'>
            {globalCtx.flagFn(props.team.nationality)}
            <span> </span>
            <span> </span>
            {props.team.nationality}
          </div>
        </TableCell>
        <TableCell className='details-btn'>
          <a href={props.team.url} target='_blank'>
            <OpenInNewIcon />
          </a>
        </TableCell>
      </TableRow>
    </>
  );
};
export default SearchResultsDriversTableRow;
