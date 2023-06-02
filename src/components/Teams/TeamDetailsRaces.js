import React, { useContext } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import GlobalContext from '../../context/global-context';

const TeamDetailsRaces = (props) => {
  const globalCtx = useContext(GlobalContext);

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
      <Table className='tableContainer' style={{ margin: '0' }}>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Round</TableCell>
            <TableCell>Race Name</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>
              {props.teamResults[0].Results[0].Driver.familyName}
            </TableCell>
            <TableCell>
              {props.teamResults[0].Results[1]?.Driver.familyName ?? 'Driver 2'}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.teamResults.map((teamResult, index) => {
            return (
              <TableRow key={teamResult.round}>
                <TableCell className='tableRow-cell'>
                  {teamResult.round}
                </TableCell>
                <TableCell
                  onClick={() => props.handleDrivers(teamResult.round)}
                  className='mouseHandle tableRow-cell'
                >
                  <div className='flagName'>
                    {globalCtx.flagFn(
                      props.teamResults[index].Circuit.Location.country
                    )}
                    <span> </span>
                    {teamResult.raceName}
                  </div>
                </TableCell>
                <TableCell className='tableRow-cell'>
                  {Number(teamResult.Results[0].points) +
                    Number(teamResult.Results[1]?.points ?? '0')}
                </TableCell>
                <TableCell
                  className={`tableRow-cell ${classFunction(
                    teamResult.Results[0].position ?? '0',
                    teamResult.Results[0].points
                  )}`}
                >
                  {teamResult.Results[0].position}
                </TableCell>
                <TableCell
                  className={`tableRow-cell ${classFunction(
                    teamResult.Results[1]?.position ?? '0',
                    teamResult.Results[1]?.points ?? '0'
                  )}`}
                >
                  {teamResult.Results[1]?.position ?? '0'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default TeamDetailsRaces;
