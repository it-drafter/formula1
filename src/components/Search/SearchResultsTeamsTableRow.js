import React, { useState, useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import GlobalContext from '../../context/global-context';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const SearchResultsDriversTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);

  return (
    <>
      <TableRow>
        <TableCell component='th' scope='row' className='tableRow-cell'>
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
