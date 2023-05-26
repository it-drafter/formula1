import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import YearSelect from './YearSelect';
// import { useContext } from 'react';
// import GlobalContext from '../context/global-context';

const Home = () => {
  // const [selectYear, setSelecetYear] = useState(null);

  // const handleSelectedYear = (year) => {
  //   console.log('Home component:', year);
  //   // return year;
  // };

  function handleClick(event) {
    event.preventDefault();
    // console.info('You clicked a breadcrumb. -- Home');
  }

  return (
    <>
      <div role='presentation' onClick={handleClick}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link
            underline='hover'
            color='text.red'
            aria-current='page'
            className='rucica'
          >
            Home
          </Link>
        </Breadcrumbs>

        {/* <GlobalContext.Provider value={{ yearFn: handleSelectedYear }}> */}
        <YearSelect />
        {/* </GlobalContext.Provider> */}

        <div>SELECTED YEAR</div>
      </div>
    </>
  );
};

export default Home;
