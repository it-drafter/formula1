import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const BreadCrumbs = (props) => {
  if (props.home === true) {
    return false;
  }
  const navigate = useNavigate();
  //   const location = useLocation();

  //   const arrPath = location.pathname.split('/').filter((el) => el !== '');

  //   console.log(arrPath);

  //   function handleClick(event) {
  // event.preventDefault();
  //     console.info('You clicked a breadcrumb. -- Home');
  //   }

  console.log('BC Props: ', props.levels);

  const handleBCRoute = (destination) => {
    console.log('klik');

    if (Array.isArray(destination)) {
      navigate(destination[1]);
    }
  };
  //   console.log('Ivan navigacija', navigate);

  if (!props.levels) {
    return (
      <div className='container text-left'>
        {/* <div role='presentation' onClick={handleClick}> */}
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
      </div>
    );
  }

  const getCrumb = (level) => {
    if (!Array.isArray(level)) {
      return level;
    } else {
      return level[0];
    }
  };

  return (
    <div className='container text-left'>
      {/* <h1>Breadcrumbs component</h1> */}

      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          underline='hover'
          color='black'
          onClick={() => navigate('/')}
          className='rucica'
        >
          Home
        </Link>
        {props.levels.map((level, index) => (
          <Link
            key={index}
            underline='hover'
            color={props.levels.length === index + 1 ? 'text.red' : 'black'}
            onClick={() => handleBCRoute(level)}
            className='rucica'
          >
            {getCrumb(level)}
          </Link>
        ))}

        {/* <Link
          underline='hover'
          color='black'
          onClick={handleBCRoute}
          className='rucica'
        >
          Home
        </Link>
        <Link underline='hover' color='text.red' className='rucica'>
          Drivers
        </Link> */}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;