const port = 4000;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// forward static file
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);

var apiRouter = express.Router();
app.use('/api', apiRouter);
  
// createAuthorization from the given credentials
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.userName)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.userName, req.body.password, req.body.highScore);
        setAuthCookie(res, user.token);
        res.send({
            id: user._id,
        });
    }
});
  
// loginAuthorization from the given credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                setAuthCookie(res, user.token);
                res.send({ id: user._id });
                return;
            }
        }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// pull users highscore
apiRouter.get('/highScore/:userName', async (req, res) => {
    const userName = req.params.userName;
    const highScore = await DB.getUserHighScore(userName);
    res.send({highScore});
})

// update users high score
apiRouter.put('/updatePlayerScore', (req, res) => {
    const userScore = req.body;
    DB.updateUserHighScore(userScore);
    res.sendStatus(200);
})

// update scores
apiRouter.put('/updateScores', (req, res) => {
    const score = req.body;
    DB.addScore(score);
})

// Get highScores
apiRouter.get('/highScores', async (req, res) => {
    const scores = await DB.getHighScores();
    res.send(scores);
});

// Get recentScores
apiRouter.get('/recentScores', async (req, res) => {
    const scores = await DB.getRecentScores();
    res.send(scores);
});
  
// getMe for the currently authenticated user
app.get('/user/me', async (req, res) => {
    authToken = req.cookies['token'];
    const user = await collection.findOne({ token: authToken });
    if (user) {
        res.send({ highScore: user.highScore });
        return;
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

function setAuthCookie(res, authToken) {
    res.cookie('token', authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }

// launch the server on port 4000
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