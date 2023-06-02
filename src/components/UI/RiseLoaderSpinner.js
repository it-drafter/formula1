import React from 'react';
import { RiseLoader } from 'react-spinners';

const RiseLoaderSpinner = () => {
  return (
    <>
      <RiseLoader
        style={{
          height: '50vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </>
  );
};

export default RiseLoaderSpinner;
