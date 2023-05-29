import React from 'react';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import YearSelect from './YearSelect';
import Drivers from './Drivers';
import BreadCrumbs from './BreadCrumbs';
import Footer from './Footer';
// import { useContext } from 'react';
// import GlobalContext from '../context/global-context';

const Home = () => {
  // const [reRender, setReRender] = useState(false);
  // const handleReRender = () => {
  //   console.log('rerender');
  //   setReRender(!reRender);
  // };

  // const [selectYear, setSelecetYear] = useState(null);

  // const handleSelectedYear = (year) => {
  //   console.log('Home component:', year);
  //   // return year;
  // };

 
  return (
    <>
      <BreadCrumbs />
     

      {/* <GlobalContext.Provider value={{ yearFn: handleSelectedYear }}> */}
      {/* <YearSelect onReRender={handleReRender} /> */}
      <Drivers home={true} />
      {/* </GlobalContext.Provider> */}

      {/* <div>SELECTED YEAR</div> */}
      {/* </div> */}
      <Footer />
    </>
  );
};

export default Home;
