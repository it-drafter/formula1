import React, { useEffect, useState } from 'react';
// import arrowUp from "../../../public/img/arrowUp.png"
import arrow from "../../../public/img/27431-aed9c6.png"
import strelicagore from "../../../public/img/strelicagore.png"

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
        
            <img src={strelicagore} className="arrowup" alt='↑ Return To Top ↑'/>
          </div>
        </span>
      )}
    </div>
  );
}
