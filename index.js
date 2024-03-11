const express = require('express');
const app = express();


// forward static file
app.use(express.static('public'));
app.use(express.json());

// pull high scores
app.get('/highscore', (req, res) => {res.send(highScores)})

// update high scores
app.post('/updatehigh', (req, res) => {
    highScores = req.body;
})

// update recent score
app.put('/updaterecent', (req, res) => {
    const newRecent = req.body;
    recentScores[2] = recentScores[1];
    recentScores[1] = recentScores[0];
    recentScores[0] = newRecent;
})

// launch the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log("Listening!!!");
})

// mock database
let users = [];

/*
{
    userName: userName;
    highScore: highScore;
} 
 */

let highScores = [];

/*
 {
    highScore: highScore;
 }
 */

let recentScores = [];

/*
{
    recentScore: recentScore;
}
 */