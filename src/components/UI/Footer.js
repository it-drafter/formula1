import React from 'react';
import moment from 'moment/moment';
import BackToTop from './BackToTop';

export default function Footer() {
  const codeYear = moment().format('YYYY');

  return (
    <div className='flexbox-top footer-team'>
      <BackToTop />
      <span className='footer-item font-responsive'>
        Coded by: Fatal Error Team &nbsp;
      </span>
      <span className='footer-item'>
        {codeYear} <span className='copyleft'>&copy;</span>{' '}
      </span>
    </div>
  );
}
