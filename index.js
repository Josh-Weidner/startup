const express = require('express');
const app = express();


// forward static file
app.use(express.static('public'));
app.use(express.json());

// create user
app.post('/createuser', (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    users.push(newUser);
    res.send("user created");
})

// pull high scores
app.get('/highscores', (req, res) => {res.send(highScores)})

// pull recent scores
app.get('/recentscores', (req, res) => {res.send(recentScores)})

// pull users highscore
app.get('/highScore/:username', (req, res) => {
    const userName = req.params.username;
    const user = users.find(user => user.userName === userName);
    if (user) {
        res.send(user.highScore.toString()); // Convert to string if it's not already a string
    } else {
        res.status(404).send("User not found"); // Respond with a 404 status if user is not found
    }
})

// update high scores
app.put('/updatehigh', (req, res) => {
    const score = req.body;
    if (score.highScore > highScores[2].highScore && score.highScore < highScores[1].highScore) {
        highScores[2] = score;
    }
    if (score.highScore > highScores[1].highScore && score.highScore < highScores[0].highScore) {
        highScores[2] = highScores[1];
        highScores[1] = score;
    }
    if (score.highScore > highScores[0].highScore) {
        highScores[2] = highScores[1];
        highScores[1] = highScores[0];
        highScores[0] = score;
    }
})

// update recent score
app.put('/updaterecent', (req, res) => {
    const score = req.body;
    recentScores[2] = recentScores[1];
    recentScores[1] = recentScores[0];
    recentScores[0] = score;
})

// update users high score
app.put('/:username/:score', (req, res) => {
    const userName = req.params.username;
    const score = req.params.score;
    const user = users.find(user => user.userName === userName);
    if (user.highScore === undefined) {
        user.highScore = score;
    }
    else if (user.highScore < score) {
        user.highScore = score;
    }
})

// launch the server on port 4000
const port = 4000;
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

let highScores = [
    {userName: "-", highScore: 0}, 
    {userName: "-", highScore: 0}, 
    {userName: "-", highScore: 0}
];

/*
 {
    highScore: highScore;
 }
 */

let recentScores = [
    {userName: "-", highScore: 0},
    {userName: "-", highScore: 0}, 
    {userName: "-", highScore: 0}
];

/*
{
    recentScore: recentScore;
}
 */