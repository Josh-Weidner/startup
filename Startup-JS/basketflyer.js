if (localStorage.getItem('latestScore1') !== null) {
    document.querySelector(".latest").innerHTML = "Latest Score: " + localStorage.getItem('latestScore1');
    document.querySelector(".high").innerHTML = "High Score: " + localStorage.getItem('highScore1');
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        window.location.replace("test.html");
    }
    else if (e.keyCode == '40') {
        window.location.replace("test.html");
    }
    else if (e.keyCode == '37') {
        window.location.replace("test.html");
    }
    else if (e.keyCode == '39') {
        window.location.replace("test.html");
    }

}