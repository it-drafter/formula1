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
import QualifyingTableRow from './QualifyingTableRow';


const RaceQualifyingResults = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [qualifying, setQualifying] = useState([]);

    useEffect(() => {
        getQualifying();
    }, []);

    const getQualifying = async () => {
        const url = 'http://ergast.com/api/f1/2013/results/1.json';
        setIsLoading(true);
        try {
            const response = await axios.get(url);
            //   console.log('response', response);
            //   if (response.request.status !== 200) {
            //     throw new Error('Something went wrong!');
            //   }
            const data =
                response.data.MRData.RaceTable.Races.QualifyingResults;
            console.log(data);
            setQualifying(data);
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
            <h1>Qualifying component</h1>
            <Table>
                <TableHead>
                    <TableRow className='table-header'>
                        <TableCell>Pos</TableCell>
                        <TableCell>Driver</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Best Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {qualifying.map((qualifier, index) => (
                        <QualifyingTableRow key={qualifier.position} qualifier={qualifier} />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default RaceQualifyingResults;