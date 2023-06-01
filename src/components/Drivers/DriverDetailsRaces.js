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
  // console.log('eeee', props.driverDetailsRaces[0].Circuit.Location.country);
  const navigate = useNavigate();
  console.log('props');

  const handleTeamClick = (teamId) => {
    console.log('klik na tim ');
    const linkTo = `/teams/details/${teamId}`;
    navigate(linkTo);
  };
  // console.log('eeee', props.driverDetailsRaces[0].Circuit.Location.country);

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
                  className='mouseHandle'
                >
                  <div className='flagName'>
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
                  className='mouseHandle flagName'
                >
                  <div className='flagName'>
                    {globalCtx.flagFn(
                      DetailRace.Results[0].Constructor.nationality
                    )}
                    <span> </span>
                    {DetailRace.Results[0].Constructor.name}
                  </div>
                </TableCell >
                {/* <TableCell>{DetailRace.Results[0].Constructor.name}</TableCell> */}
                <TableCell>{DetailRace.Results[0].grid}</TableCell>
                <TableCell
                  className={classFunction(
                    DetailRace.Results[0].position,
                    DetailRace.Results[0].points
                  )}
                //{classFunction(props.result.position, props.result.points)}
                //{'position_' + DetailRace.Results[0].position}
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
