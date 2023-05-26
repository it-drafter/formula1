import moment from 'moment/moment';
import React, { useContext } from 'react';
import GlobalContext from '../context/global-context';

export default function YearSelect() {
  const globalCtx = useContext(GlobalContext);

  const startYear = 1950;
  const allYear = moment().year();
  // const { handleselectedYear } = useContext(GlobalContext);

  const years = [];
  for (let year = startYear; year <= allYear; year++) {
    years.push(year);
  }

  const handleClick = (year) => {
    globalCtx.setYearFn(year);
    console.log('YearSelect component:', year);
  };

  return (
    <div>
      <h1>Year list:</h1>

      <ul>
        {years.map((year) => (
          <li key={year} onClick={() => handleClick(year)}>
            {year}
          </li>
        ))}
      </ul>
    </div>
  );
}
