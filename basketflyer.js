document.onkeydown = checkKey;

document.querySelector(".latest").innerHTML = localStorage.getItem('latestScore');
document.querySelector(".high").innerHTML = localStorage.getItem('highScore');

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