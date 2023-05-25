import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const DriverDetailsRaces = (props) => {
  return (
    <>
      <h1>DriverDetailsRaces</h1>
      <Table>
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
          {props.driverDetailsRaces.map((DetailRace) => (
            <TableRow key={DetailRace.round}>
              <TableCell>{DetailRace.round}</TableCell>
              <TableCell
                onClick={() => props.handleRouteToGrandPrix(DetailRace.round)}
                className="rucica"
              >
                {DetailRace.raceName}
              </TableCell>
              <TableCell>
                {DetailRace.Results[0].Constructor.constructorId}
              </TableCell>
              <TableCell>{DetailRace.Results[0].grid}</TableCell>
              <TableCell
                className={'position_' + DetailRace.Results[0].position}
              >
                {DetailRace.Results[0].position}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DriverDetailsRaces;
