import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './play.css';

export function Game() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLocalStorageChange = () => {
      const latest = localStorage.getItem('playCount');
      if (latest) {
        // Navigate to a new page when "latest" is updated
        navigate('/playNow'); // Replace '/newPage' with your desired URL
      }
    };

    // Listen for changes to the "latest" variable in local storage
    window.addEventListener('storage', handleLocalStorageChange);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('storage', handleLocalStorageChange);
    };
  }, [history]);

  return (
    <>
      <style>
        {`
          header {
            display: none;
            height: 50px;
          }

          main {
            height: 90vh;
          }

          .soundCloud {
            display: none;
          }
        `}
      </style>
        <iframe className="game" src='basketflyer.html' scrolling="no" frameBorder="0"></iframe>
    </>
  );
}

