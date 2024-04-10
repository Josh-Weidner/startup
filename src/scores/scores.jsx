import React from 'react';
import './scores.css'; // Make sure to import your CSS file

export function Scores() {
  return (
    <main>
        <div className="login">
            <table className="table">
              <caption>High Scores</caption>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
              <tr>
                <td>1</td>
                <td className="highPlayer1">-</td>
                <td className="highscore1">0</td>
              </tr>
              <tr>
                <td>2</td>
                <td className="highPlayer2">-</td>
                <td className="highscore2">0</td>
              </tr>
              <tr>
                <td>3</td>
                <td className="highPlayer3">-</td>
                <td className="highscore3">0</td>
              </tr>
            </table>
            <table className="table">
              <caption>Recent Scores</caption>
              <tr>
                <th>Date/Time</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
              <tr>
                <td>-</td>
                <td className="player1">-</td>
                <td className="latestscore1">0</td>
              </tr>
              <tr>
                <td>-</td>
                <td className="player2">-</td>
                <td className="latestscore2">0</td>
              </tr>
              <tr>
                <td>-</td>
                <td className="player3">-</td>
                <td className="latestscore3">0</td>
              </tr>
            </table>
          </div>
        </main>
    );
  } 