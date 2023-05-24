import React, {useState} from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';

const DriversTableRow = (props) => {
    
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const handleClickDetails = (driverId) => {
        console.log(driverId);
        const linkTo = `/drivers/details/${driverId}`;
        navigate(linkTo);
    };

    
    return (
        <TableRow>
            
            <TableCell onClick={() => handleClickDetails(props.driver.Driver.driverId)}>
            
            <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
            </TableCell>
            <TableCell>{props.driver.position}</TableCell>
            <TableCell
               
            >
                {props.driver.Driver.givenName + " " + props.driver.Driver.familyName}
            </TableCell>
            <TableCell>{props.driver.Constructors[0].name}</TableCell>
            <TableCell>{props.driver.points}</TableCell>
        </TableRow>
    )

}
export default DriversTableRow;






//zakomentarisi

// import React from "react";
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import { useNavigate } from 'react-router-dom';

// const DriversTableRow = (props) => {
//     const navigate = useNavigate();
//     const handleClickDetails = (driverId) => {
//         console.log(driverId);
//         const linkTo = `/drivers/details/${driverId}`;
//         navigate(linkTo);
//     };

    
//     return (
//         <TableRow>
//             <TableCell>{props.driver.position}</TableCell>
//             <TableCell
//                 onClick={() => handleClickDetails(props.driver.Driver.driverId)}
//             >
//                 {props.driver.Driver.givenName + " " + props.driver.Driver.familyName}
//             </TableCell>
//             <TableCell>{props.driver.Constructors[0].name}</TableCell>
//             <TableCell>{props.driver.points}</TableCell>
//         </TableRow>
//     )

// }
// export default DriversTableRow;