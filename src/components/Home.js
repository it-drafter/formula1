import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


const Home = () => {

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb. -- Home');
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
      </div>
    </>
  );
};

export default Home;
