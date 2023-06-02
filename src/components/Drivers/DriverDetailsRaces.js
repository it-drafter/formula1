import React, { useContext } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import GlobalContext from '../../context/global-context';
import { useNavigate } from 'react-router-dom';

const DriverDetailsRaces = (props) => {
  const globalCtx = useContext(GlobalContext);
  const navigate = useNavigate();
  const handleTeamClick = (teamId) => {
    const linkTo = `/teams/details/${teamId}`;
    navigate(linkTo);
  };
  const classFunction = (position, points) => {
    if (position === '1') {
      return 'gold';
    } else if (position === '2') {
      return 'silver';
    } else if (position === '3') {
      return 'bronze';
    } else if (points > '0') {
      return 'green';
    } else return 'gray';
  };
  return (
    <>
      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Round</TableCell>
            <TableCell>Grand Prix</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Grid</TableCell>
            <TableCell>Race</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.driverDetailsRaces.map((DetailRace, index) => {
            return (
              <TableRow key={DetailRace.round}>
                <TableCell className='tableRow-cell'>{DetailRace.round}</TableCell>
                <TableCell
                  onClick={() => props.handleRouteToGrandPrix(DetailRace.round)}
                  className='mouseHandle tableRow-cell'
                >
                  <div className='flagName tableRow-cell'>
                    {globalCtx.flagFn(
                      props.driverDetailsRaces[index].Circuit.Location.country
                    )}
                    <span> </span>
                    {DetailRace.raceName}
                  </div>
                </TableCell>
                <TableCell
                  onClick={() =>
                    handleTeamClick(
                      DetailRace.Results[0].Constructor.constructorId
                    )
                  }
                  className='mouseHandle flagName tableRow-cell'
                >
                  <div className='flagName tableRow-cell'>
                    {globalCtx.flagFn(
                      DetailRace.Results[0].Constructor.nationality
                    )}
                    <span> </span>
                    {DetailRace.Results[0].Constructor.name}
                  </div>
                </TableCell >
                <TableCell className='tableRow-cell'>{DetailRace.Results[0].grid}</TableCell>
                <TableCell
                  className={`tableRow-cell ${classFunction(DetailRace.Results[0].position, DetailRace.Results[0].points)}`}
                >
                  {DetailRace.Results[0].position}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default DriverDetailsRaces;
