import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './play.css';

// Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

export function Play() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            e = e || window.event;
            if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 37 || e.keyCode === 39) {
                navigate('/game');
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

    useEffect(() => {
        if (localStorage.getItem('latest')) {
            document.querySelector(".latest").innerHTML = "Latest Score: " + localStorage.getItem('latest');
        }

        async function getHigh() {
            try {
                if (localStorage.getItem('highScore') == null) {
                    const currentUser = localStorage.getItem('userName');
                    const response = await fetch(`/api/highScore/${currentUser}`, { method: 'GET' })
                    if (!response.ok) {
                        throw new Error(`response error ${response.status}`);
                    }
                    const highScore = await response.json();
                    console.log(highScore.highScore);
                    if (highScore.highScore !== null) {
                        document.querySelector(".high").innerHTML = "High Score: " + highScore.highScore;
                        localStorage.setItem("highScore", highScore.highScore);
                    }
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
