import React, { useEffect } from "react";
import { BrowserRouter, NavLink, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./login/login";
import { Play } from "./play/play";
import { Game } from "./play/game.jsx";
import { Scores }from "./scores/scores";
import { AuthState } from './login/authState';
import './app.css';
import logo from './BasketFlyer.png';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
  

  useEffect(() => {
    // Fetch data from SoundCloud API
    const url = 'https://soundcloud.com/oembed';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'format': 'json',
        'url': 'https://soundcloud.com/user-204876641/home-resonance-432-hz-slowed'
      })
    };

    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.html);
        const soundCloud = data.html;
        const soundDiv = document.querySelector(".soundCloud");
        soundDiv.innerHTML = soundCloud;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
      <BrowserRouter>
        <header>
          <div>
            <img className="basketflyer" src={logo} alt="BasketFlyer Logo" />
          </div>
          <nav>
            <menu>
              <div className="div">
                <NavLink to='/'>Login</NavLink>
              </div>
              <div className="div">
                <NavLink to='/playNow'>Play Now</NavLink>
              </div>
              <div className="div">
                <NavLink to='/leaderboard'>Leaderboard</NavLink>
              </div>
            </menu>
          </nav>
        </header>

        <main>
          <div id="background-wrap">
            <div className="x1">
              <div className="cloud"></div>
            </div>
            <div className="x2">
              <div className="cloud"></div>
            </div>
            <div className="x3">
              <div className="cloud"></div>
            </div>
            <div className="x4">
              <div className="cloud"></div>
            </div>
            <div className="x5">
              <div className="cloud"></div>
            </div>
          </div>
          <Routes>
            <Route path='/' element={<Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />} exact />
            <Route path='/playNow' element={<Play />} exact />
            <Route path='/leaderboard' element={<Scores />} exact />
            <Route path='/game' element={<Game />} exact />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </main>

        <footer>
          <div className="footer">
            <span className="text-reset">Josh Weidner</span>
            <br />
            <a href="https://github.com/Josh-Weidner/startup">GitHub</a>
          </div>
          <div className="soundContainer">
            <div className="soundCloud"></div>
          </div>
        </footer>
      </BrowserRouter>
  );
}

export default App;
