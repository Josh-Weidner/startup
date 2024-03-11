const high = fetch('/highscores', {method: 'GET'});
const recent = fetch('/recentscore', {method: 'GET'});

document.querySelector(".highscore1").innerHTML = high[0].highScore;
document.querySelector(".highPlayer1").innerHTML = high[0].userName;
document.querySelector(".highscore2").innerHTML = high[1].highScore;
document.querySelector(".highPlayer2").innerHTML = high[1].userName;
document.querySelector(".highscore3").innerHTML = high[2].highScore;
document.querySelector(".highPlayer3").innerHTML = high[2].userName;
document.querySelector(".latestscore1").innerHTML = recent[0].highScore;
document.querySelector(".player1").innerHTML = recent[0].userName;
document.querySelector(".latestscore2").innerHTML = recent[1].highScore;
document.querySelector(".player2").innerHTML = recent[1].userName;
document.querySelector(".latestscore3").innerHTML = recent[2].highScore;
document.querySelector(".player3").innerHTML = recent[2].userName;