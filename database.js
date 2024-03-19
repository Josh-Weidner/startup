const { MongoClient } = require('mongodb');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('basketflyer');
const userCollection = db.collection('user');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(userName) {
  return userCollection.findOne({ userName: userName});
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token});
}

async function createUser(userName, password, highScore) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    userName: userName,
    password: passwordHash,
    highScore: highScore,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  console.log('user added to the database');
  return user;
}

function addScore(userScore) {
  scoreCollection.insertOne(userScore);
}

async function getHighScores() {
  console.log("we are in the database function");
  const query = { highScore: { $gt: 0 } }; // Assuming all scores are positive values
  const options = {
    sort: { highScore: -1 },
    limit: 3, // Update limit to retrieve only the top three scores
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

async function getRecentScores() {
  const query = { highScore: { $gt: 0 } }; // Assuming all scores are positive values
  const options = {
    sort: { timeStamp: -1 },
    limit: 3, // Update limit to retrieve only the three most recent scores
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

function getUserHighScore(userName) {
  const player = userCollection.findOne(userName);
  return player.highScore;
}

function updateUserHighScore(userScore) {
  const userName = userScore.userName
  const highScore = userScore.highScore
  const player = userCollection.findOne({ userName: userName});
  if (player.highScore < highScore) {
    player.highScore = highScore;
  }
}

module.exports = {
  getUser,
  getUserByToken,
  getHighScores,
  getRecentScores,
  createUser,
  addScore,
  updateUserHighScore,
  getUserHighScore
};
