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
          {`${props.driver.givenName} ${props.driver.familyName}`}
        </TableCell>
        <TableCell>
          <div className='flagName tableRow-cell'>
            {globalCtx.flagFn(props.driver.nationality)}
            <span> </span>
            {props.driver.nationality}
          </div>
        </TableCell>
        <TableCell className='tableRow-cell'>
          {props.driver.dateOfBirth}
        </TableCell>
        <TableCell className='details-btn'>
          <a href={props.driver.url} target='_blank'>
            <OpenInNewIcon />
          </a>
        </TableCell>
      </TableRow>
    </>
  );
};
export default SearchResultsDriversTableRow;
