import React from 'react';
import { useNavigate } from 'react-router-dom';


import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <button variant='primary' onClick={() => navigate('/play')}>
        Play
      </button>
      <button type="button" id="logout" variant='secondary' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
