fetch('/highscores', { method: 'GET' })
    .then(response => {
        return response.json();
    })
    .then(highScores => {
        document.querySelector(".highscore1").innerText = highScores[0].highScore;
        document.querySelector(".highPlayer1").innerText = highScores[0].userName;
        document.querySelector(".highscore2").innerText = highScores[1].highScore;
        document.querySelector(".highPlayer2").innerText = highScores[1].userName;
        document.querySelector(".highscore3").innerText = highScores[2].highScore;
        document.querySelector(".highPlayer3").innerText = highScores[2].userName;
    })
    .catch(error => {
        console.error('Error fetching high scores:', error);
    });

fetch('/recentscores', { method: 'GET' })
    .then(response => {
        return response.json();
    })
    .then(recentScores => {
        document.querySelector(".latestscore1").innerText = recentScores[0].highScore;
        document.querySelector(".player1").innerText = recentScores[0].userName;
        document.querySelector(".latestscore2").innerText = recentScores[1].highScore;
        document.querySelector(".player2").innerText = recentScores[1].userName;
        document.querySelector(".latestscore3").innerText = recentScores[2].highScore;
        document.querySelector(".player3").innerText = recentScores[2].userName;
    })
    .catch(error => {
        console.error('Error fetching recent scores:', error);
    });