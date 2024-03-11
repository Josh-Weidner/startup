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

const currentUser = localStorage.getItem('player');

if (localStorage.getItem('latest') != " ") {
    document.querySelector(".latest").innerHTML = "Latest Score: " + localStorage.getItem('latest');
}    

// get current users high score
fetch(`/highScore/${currentUser}`, {method: 'GET'})
    .then(response => {
        return response.json();
    })
    .then(score => {
        console.log(score);
        if (score != " ") {
            document.querySelector(".high").innerHTML = "High Score: " + score;
        }
    })