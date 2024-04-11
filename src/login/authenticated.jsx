import React from 'react';

import './authenticated.css';

export function Authenticated(props) {

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.clear();
        props.onLogout();
      });
  }

  return (
    <>
      <div className='playerName'>{props.userName}</div>
      <button type="button" id="logout" onClick={() => logout()}>
        Logout
      </button>
    </>
  );
}
