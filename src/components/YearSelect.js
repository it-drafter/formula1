import moment from "moment/moment";
import React, {  useContext,  } from "react";
import YearContext from "../context/global-context";


export default function YearSelect() {
    const startYear = 1950;
    const allYear = moment().year()
    const {handleselectedYear} = useContext(YearContext);

    const years = [];
  for (let year = startYear; year <= allYear; year++) {
    years.push(year);
  };

  const handleClick = (year) => {
    handleselectedYear(year)
    console.log("Selected year:" ,year)
  }
   
   
  

    
    return(
        <div>
            <h1>Year list:</h1>
           
            <ul>
                {years.map((year) => (

                <li key={year} 
                onClick={() => handleClick(year)}
                >{year}</li>
                ))}
            </ul>
            
        </div>
    )
}