import React, { useEffect, useState } from 'react';

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
          <button onClick={handleScrollOnTop} className='back-to-top'>
            ↑ Return To Top ↑
          </button>
        </span>
      )}
    </div>
  );
}
