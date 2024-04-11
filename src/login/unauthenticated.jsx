import { useNavigate } from 'react-router-dom';

import React from 'react';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  async function loginUser() {
    login(`/api/auth/login`);
  }

  async function createUser() {
    create(`/api/auth/create`);
  }

  async function login(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({userName: userName, password: password}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
      navigate('/playNow');
    } else {
      alert("Incorrect username or password");
    }
  }

  async function create(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({userName: userName, password: password}),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
      navigate('/playNow');
    } else {
      const body = await response.json();
      alert("Name already in use");
    }
  }

  return (
    <form>
        <input
        className='form-control'
        type='text'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder='username'
        />
        <input
        id="pw"
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
        />
        <button type="button" id="login" variant='primary' onClick={() => loginUser()}>
          Login
        </button>
        <div className="buttons">
            <button type="button" id="createUser" variant='secondary' onClick={() => createUser()}>
            Create User
            </button>
        </div>
    </form>
  );
}
