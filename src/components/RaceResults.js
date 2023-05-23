import React, { useState, useEffect } from 'react';
import { RiseLoader } from 'react-spinners';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';
import axios from 'axios';
import ResultsTableRow from './ResultsTableRow';


const RaceResults = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState([]);

    useEffect(() => {
        getResults();
    }, []);

    const getResults = async () => {
        const url = 'http://ergast.com/api/f1/2013/1/results.json';
        setIsLoading(true);
        try {
            const response = await axios.get(url);
            //   console.log('response', response);
            //   if (response.request.status !== 200) {
            //     throw new Error('Something went wrong!');
            //   }
            const data =
                response.data.MRData.RaceTable.Races.Results;
            console.log(data);
            setResults(data);
            setIsLoading(false);
        } catch (err) {
            //   console.log(err);
            setError(err);
        }
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (isLoading) {
        return (
            <RiseLoader
                style={{
                    height: '50vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        );
    }

    return (
        <>
            <h1>Results component</h1>
            <Table>
                <TableHead>
                    <TableRow className='table-header'>
                        <TableCell>Pos</TableCell>
                        <TableCell>Driver</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {results.map((result, index) => (
                        <RaceTableRow key={race.position} race={race} />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default RaceResults;