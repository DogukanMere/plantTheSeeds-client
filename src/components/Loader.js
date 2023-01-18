import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='success'
      style={{
        width: '80px',
        height: '80px',
        margin: 'auto',
        display: 'block',
        marginTop: '5rem',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
