import React, { useEffect, useState } from 'react';
import arrow from '../../img/totop.png';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      window.pageYOffset > 300 ? setVisible(true) : setVisible(false);
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => {
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, []);
  const handleScrollOnTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {visible && (
        <span>
          <div onClick={handleScrollOnTop} className='back-to-top'>
            <img src={arrow} className='arrowup' alt='↑ Return To Top ↑' />
          </div>
        </span>
      )}
    </div>
  );
}
