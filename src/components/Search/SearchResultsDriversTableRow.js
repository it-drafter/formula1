import React, { useContext } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import GlobalContext from '../../context/global-context';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

const SearchResultsDriversTableRow = (props) => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDriverDetails = (driverId) => {
    const linkTo = `/drivers/details/${driverId}`;
    navigate(linkTo);
  };

  return (
    <>
      <TableRow>
        <TableCell
          component='th'
          scope='row'
          className='mouseHandle tableRow-cell'
          onClick={() => handleDriverDetails(props.driver.driverId)}
        >
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
