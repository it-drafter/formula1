import React, { useContext } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import GlobalContext from '../context/global-context';

const DriverDetailsRaces = (props) => {
  const globalCtx = useContext(GlobalContext);
  console.log("eeee", props.driverDetailsRaces[0].Circuit.Location.country)
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
          {props.driverDetailsRaces.map((DetailRace, index) => (
            <TableRow key={DetailRace.round}>
              <TableCell>{DetailRace.round}</TableCell>
              <TableCell
                onClick={() => props.handleRouteToGrandPrix(DetailRace.round)}
                className='mouseHandle'
              >
                <div className="flagName">
                  {globalCtx.flagFn(props.driverDetailsRaces[index].Circuit.Location.country)}
                  {DetailRace.raceName}
                </div>
              </TableCell>
              <TableCell>{DetailRace.Results[0].Constructor.name}</TableCell>
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
