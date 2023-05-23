import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RiseLoader } from 'react-spinners';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';

const TeamDetails = () => {

    const [teamDetails, setTeamDetails] = useState({});
    const [teamResults, setTeamResults] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    const params = useParams();

    const teamsId = params.teamsId;

    useEffect(() => {
        getTeamDetails();
    }, []);


    const getTeamDetails = async () => {
        const urlDetails = `https://ergast.com/api/f1/2013/constructors/${teamsId}/constructorStandings.json`
        const urlResults = `http://ergast.com/api/f1/2013/constructors/${teamsId}/results.json`
        const responseDetails = await axios.get(urlDetails);
        const responseResults = await axios.get(urlResults);

        setTeamDetails(
            responseDetails.data.MRData.StandingsTable.StandingList[0].ConstructorStandings[0]
        );
        setTeamResults(
            responseResults.data.MRData.RaceTable.Races[0]
        );

        setIsLoading(false);


    };
    if (isLoading) {
        return <RiseLoader />
    }
    return (
        <> <div>
            <h1>Team Details</h1>
      
            <p>Name{teamDetails.Constructor.name}</p>
            <p>Url{teamDetails.Constructor.url}</p>
            <p>Nationality{teamDetails.Constructor.nationality}</p>
        </div>
            <Table>
                <TableHead>
                    <TableRow className="table-header">
                        <TableCell>Position</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>Wins</TableCell>
                        <TableCell>Constructor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teamResults.map((teamResults) => (
                        <TableRow key={teamResults.position}>
                            <TableCell>{teamResults}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
export default TeamDetails;