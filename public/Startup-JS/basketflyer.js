// Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';

const currentUser = localStorage.getItem('player');

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // Let other players know a new game has started
        window.location.replace("test.html");
    }
    else if (e.keyCode == '40') {
        // Let other players know a new game has started
        window.location.replace("test.html");
    }
    else if (e.keyCode == '37') {
        // Let other players know a new game has started
        window.location.replace("test.html");
    }
    else if (e.keyCode == '39') {
        // Let other players know a new game has started
        window.location.replace("test.html");
    }

}

if (localStorage.getItem('latest')) {
    document.querySelector(".latest").innerHTML = "Latest Score: " + localStorage.getItem('latest');
}    

// get current users high score
async function getHigh(currentUser) {
    try {
        if (localStorage.getItem('highScore') == null) {
            const response = await fetch(`/api/highScore/${currentUser}`, {method: 'GET'})
            if (!response.ok) {
                throw new Error('response error ${response.status}');
            }
            const highScore = await response.json();
            console.log(highScore.highScore);
            if (highScore.highScore != 0) {
                document.querySelector(".high").innerHTML = "High Score: " + highScore.highScore;
            }
            localStorage.setItem("highScore", highScore.highScore);
        } else {
            document.querySelector(".high").innerHTML = "High Score: " + localStorage.getItem("highScore");
        }
    }
    catch(error) {
        console.error("Error fetching highScore ", error);
    }
}

// Functionality for peer communication using

getHigh(currentUser);
// Let other players know the game has concluded
