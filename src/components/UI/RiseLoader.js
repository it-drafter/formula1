import React from 'react';
import { RiseLoader } from 'react-spinners';

const RiseLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDrivers();
    });


    const getDrivers = async () => {
        // const url = `https://ergast.com/api/f1/${globalCtx.chosenYear}/driverStandings.json`;
        // // const url = `https://raw.githubusercontent.com/nkezic/f1/main/AllDrivers`;
        setIsLoading(true);
        try {
            // const response = await axios.get(url);
            // console.log('response', response);
            //   if (response.request.status !== 200) {
            //     throw new Error('Something went wrong!');
            //   }
            // const data =
            //     response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            //console.log(data);
            //setDrivers(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <>
                <RiseLoader
                    style={{
                        height: '50vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} />
            </>
        );
    }
}

    export default RiseLoader;
