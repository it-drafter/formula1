import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import YearSelect from './YearSelect';
import { usecontext } from 'react';
import YearContext from '../context/global-context';





const Home = () => {
  // const [selectYear, setSelecetYear] = useState(null);
  
  const handleselectedYear = (year) => {
    console.log('You have selected:', year);
  };




  function handleClick(event) {
    event.preventDefault();
    // console.info('You clicked a breadcrumb. -- Home');
  }
  
 


  return (
    <>
     <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="text.red"
          aria-current="page"
          className="rucica"
        >
          Home
        </Link>
      </Breadcrumbs>
      
      <YearContext.Provider value={{ handleselectedYear }} >
      <YearSelect  />
      </YearContext.Provider>

      <div>SELECTED YEAR</div>
      </div>
    </>
  );
};

export default Home;
