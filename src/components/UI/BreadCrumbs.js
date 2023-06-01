import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const BreadCrumbs = (props) => {
  if (props.home === true) {
    return false;
  }
  const navigate = useNavigate();
  //   const location = useLocation();

  //   const arrPath = location.pathname.split('/').filter((el) => el !== '');

  //   console.log(arrPath);

  // console.log('BC Props: ', props.levels);

  const handleBCRoute = (destination) => {
    console.log('klik');

    if (Array.isArray(destination)) {
      navigate(destination[1]);
    }
  };
  //   console.log('Ivan navigacija', navigate);

  if (!props.levels) {
    return (
      <Breadcrumbs aria-label='breadcrumb d-block'>
        <span
          // underline='hover'
          // color='text.red'
          aria-current='page'
          className='text-light'
          style={{ fontFamily: 'formulaBold' }}
        >
          Home
        </span>
      </Breadcrumbs>
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
    <div className=''>
      {/* <h1>Breadcrumbs component</h1> */}

      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          underline='hover'
          color='text.red'
          onClick={() => navigate('/')}
          className='mouseHandle'
          style={{ fontFamily: 'formulaBold' }}
        >
          Home
        </Link>
        {props.levels.map((level, index) => {
          if (props.levels.length === index + 1) {
            return (
              <span
                key={index}
                className='Active-breadcrumb fw-bold'
                style={{ fontFamily: 'formulaBold' }}
                // underline='none'
                // color='text.red'
                // sx={{ fontStyle: 'bold' }}
              >
                {getCrumb(level)}
              </span>
            );
          } else {
            return (
              <Link
                key={index}
                underline='hover'
                color='text.red'
                className='mouseHandle'
                onClick={() => handleBCRoute(level)}
                style={{ fontFamily: 'formulaBold' }}
              >
                {getCrumb(level)}
              </Link>
            );
          }
        })}

        {/* <Link
          underline='hover'
          color='black'
          onClick={handleBCRoute}
          className='mouseHandle'
        >
          Home
        </Link>
        <Link underline='hover' color='text.red' className='mouseHandle'>
          Drivers
        </Link> */}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
