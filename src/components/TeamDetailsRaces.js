import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

const TeamDetailsRaces = (props) => {
  return (
    <>
   
      <Table className='tableContainer'>
        <TableHead>
          <TableRow className='table-header'>
            <TableCell>Round</TableCell>
            <TableCell>Race Name</TableCell>
            <TableCell>
              {props.teamResults[0].Results[0].Driver.familyName}
            </TableCell>
            <TableCell>
              {props.teamResults[0].Results[1]?.Driver.familyName ?? 'Driver 2'}
            </TableCell>
            <TableCell>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.teamResults.map((teamResult) => {
            return (
              <TableRow key={teamResult.round}>
                <TableCell>{teamResult.round}</TableCell>
                <TableCell
                  onClick={() => props.handleDrivers(teamResult.round)}
                  className='mouseHandle'
                >
                  {teamResult.raceName}
                </TableCell>
                <TableCell
                  className={
                    'position_' + teamResult.Results[0].position ?? '0'
                  }
                >
                  {teamResult.Results[0].position}
                </TableCell>
                <TableCell
                  className={
                    'position_' + teamResult.Results[1]?.position ?? '0'
                  }
                >
                  {teamResult.Results[1]?.position ?? '0'}
                </TableCell>
                <TableCell>
                  {Number(teamResult.Results[0].points) +
                    Number(teamResult.Results[1]?.points ?? '0')}
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
