import React, { useEffect } from 'react';
import './play.css';

// Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

const currentUser = localStorage.getItem('player');

function handleKeyDown(e) {
    e = e || window.event;

    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39) {
        // Let other players know a new game has started
        window.location.replace("test.html");
    }
}

export function Play() {
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (localStorage.getItem('latest')) {
            document.querySelector(".latest").innerHTML = "Latest Score: " + localStorage.getItem('latest');
        }

        async function getHigh() {
            try {
                if (localStorage.getItem('highScore') == null) {
                    const response = await fetch(`/api/highScore/${currentUser}`, { method: 'GET' })
                    if (!response.ok) {
                        throw new Error(`response error ${response.status}`);
                    }
                    const highScore = await response.json();
                    console.log(highScore.highScore);
                    if (highScore.highScore !== 0) {
                        document.querySelector(".high").innerHTML = "High Score: " + highScore.highScore;
                    }
                    localStorage.setItem("highScore", highScore.highScore);
                } else {
                    document.querySelector(".high").innerHTML = "High Score: " + localStorage.getItem("highScore");
                }
            }
            catch (error) {
                console.error("Error fetching highScore ", error);
            }
        }

        getHigh();
    }, []);

    // Let other players know the game has concluded

    return (
        <div className="login">
            <h2 className="latest">Get the basketball to the hoop without getting blocked.</h2>
            <h2 className="high">Use the up and down arrows to move the basketball with gravity.</h2>
            <h2>Press an arrow to begin!</h2>
        </div>
    );
}
