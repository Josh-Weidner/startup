import React, { useEffect, useState } from 'react';
import './scores.css'; // Make sure to import your CSS file

export function Scores() {
    const [highScores, setHighScores] = useState([]);
    const [recentScores, setRecentScores] = useState([]);

    useEffect(() => {
        // Establish WebSocket connection and configure event handler
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());

            // Update the timestamp to show seconds and minutes ago
            updateAgoTime(msg);

            // Check if the message is already in recentScores
            const isDuplicate = recentScores.some(score => score.userName === msg.userName && score.highScore === msg.highScore && score.timeStamp === msg.timeStamp);

            if (!isDuplicate) {
                setRecentScores(prevScores => {
                    // Add the new message to the beginning of the recentScores array
                    // and keep only the most recent 5 scores
                    const newScores = [msg, ...prevScores.slice(0, 4)];
                    return newScores;
                });
            }
        };

        return () => {
            // Cleanup function to close WebSocket connection when component unmounts
            socket.close();
        };
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    useEffect(() => {
        // Update "Seconds Ago" column every second
        const intervalId = setInterval(() => {
            setRecentScores(prevScores => {
                // Update the "Time Ago" value for each score
                const updatedScores = prevScores.map(score => {
                    updateAgoTime(score);
                    return score;
                });
                return updatedScores;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId); // Cleanup function to clear the interval when component unmounts
        };
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    useEffect(() => {
        async function fetchHighScores() {
            try {
                const response = await fetch(`/api/highScores`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error('Failed to fetch high scores');
                }
                const data = await response.json();
                setHighScores(data);
            } catch (error) {
                console.error('Error fetching high scores:', error);
            }
        }

        fetchHighScores();
    }, []);

    // Function to update the "Time Ago" value based on the current time
    const updateAgoTime = (msg) => {
        const timestamp = new Date(msg.timeStamp);
        const now = new Date();
        const diff = Math.floor((now - timestamp) / 1000);
        const seconds = diff % 60;
        const minutes = Math.floor(diff / 60);

        msg.timeAgo = `${minutes > 0 ? minutes + ' min ' : ''}${seconds} sec ago`;
    };

    return (
        <main>
            <div className="login">
                <table className="table">
                    <caption className='highscore'>High Scores</caption>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        {highScores.slice(0, 3).map((score, index) => (
                            <tr key={index}>
                                <td>{index === 0 ? <img src="/gold.png" alt="Gold Medal" /> : index === 1 ? <img src="/silver.png" alt="Silver Medal" /> : index === 2 ? <img src="/bronze.png" alt="Bronze Medal" /> : index + 1}</td>
                                <td className={`highPlayer${index + 1}`}>{score.userName}</td>
                                <td className={`highscore${index + 1}`}>{score.highScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="table">
                    <caption>Recent Scores</caption>
                    <tbody>
                        <tr>
                            <th>Time Ago</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                        {recentScores.map((score, index) => (
                            <tr key={index}>
                                <td>{score.timeAgo}</td>
                                <td>{score.userName}</td>
                                <td>{score.highScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
