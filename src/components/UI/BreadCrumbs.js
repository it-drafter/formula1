import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';


const BreadCrumbs = (props) => {
  if (props.home === true) {
    return false;
  }
  const navigate = useNavigate();


  const handleBCRoute = (destination) => {
    

    if (Array.isArray(destination)) {
      navigate(destination[1]);
    }
  };


  if (!props.levels) {
    return (
      <Breadcrumbs aria-label='breadcrumb d-block'>
        <span
         
          aria-current='page'
          className='homeBC font-responsive'
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
      

      <Breadcrumbs aria-label='breadcrumb'>
        <Link
          underline='hover'
          color='text.red'
          onClick={() => navigate('/')}
          className='mouseHandle font-responsive'
          style={{ fontFamily: 'formulaBold' }}
        >
          Home
        </Link>
        {props.levels.map((level, index) => {
          if (props.levels.length === index + 1) {
            return (
              <span
                key={index}
                className='Active-breadcrumb fw-bold font-responsive'
                style={{ fontFamily: 'formulaBold' }}
               
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
                className='mouseHandle font-responsive'
                onClick={() => handleBCRoute(level)}
                style={{ fontFamily: 'formulaBold' }}
              >
                {getCrumb(level)}
              </Link>
            );
          }
        })}

        
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
