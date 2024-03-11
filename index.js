const express = require('express');
const app = express();


// forward static file
app.use(express.static('public'));
app.use(express.json());

// create user
app.post('/createuser', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.send("user created");
})

// pull high scores
app.get('/highscore', (req, res) => {res.send(highScores)})

// pull recent scores
app.get('/recentscores', (req, res) => {res.send(recentScores)})

// pull users high score
app.get('/highscore/:username', (req, res) => {
    const userName = req.params.username;
    const user = users.find(user => user.userName = userName);
    res.send(user.highScore);
})

// update high scores
app.put('/updatehigh', (req, res) => {
    const score = req.body;
    if (score.highScore > highScores[2].score && score.highScore < highScores[1].score) {
        highScores[2] = score;
    }
    if (score.highScore > highScores[1].score && score.highScore < highScores[0].score) {
        highScores[2] = highScores[1];
        highScores[1] = score;
    }
    if (score.highScore > highScores[0].score) {
        highScores[2] = highScores[1];
        highScores[1] = highScores[0];
        highScores[0] = score;
    }
    res.send("scores updated appropriately");
})

// update recent score
app.put('/updaterecent', (req, res) => {
    const score = req.body;
    recentScores[2] = recentScores[1];
    recentScores[1] = recentScores[0];
    recentScores[0] = score;
    res.send("recents updated correctly");
})

// update users high score
app.put('/:username/:score', (req, res) => {
    const userName = req.params.username;
    const score = req.params.score;
    const user = users.find(user => user.userName = userName);
    if (user.highScore < score) {
        user.highScore = score;
        res.send("user highscore updated");
    }
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

let highScores = [{userName: null, highScore: 0}, {userName: null, highScore: 0}, {userName: null, highScore: 0}];

/*
 {
    highScore: highScore;
 }
 */

let recentScores = [{userName: null, highScore: 0}, {userName: null, highScore: 0}, {userName: null, highScore: 0}];

/*
{
    recentScore: recentScore;
}
 */