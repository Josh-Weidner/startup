console.log("you are on the login screen!")

const player = document.querySelector("#name");
const submitName = document.querySelector("#submitname");

// pull a cool track from soundcloud using a third party API
const url = 'https://soundcloud.com/oembed';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
        'format': 'json',
        'url': 'https://soundcloud.com/user-204876641/home-resonance-432-hz-slowed'
    })
};

fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.html);
        const soundCloud = data.html;
        const soundDiv = document.querySelector(".soundCloud");
        soundDiv.innerHTML = soundCloud;
        play();
        const frame = document.querySelector("iframe");
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

submitName.addEventListener('click',  async function() {
    console.log("you are on the login screen!")
    localStorage.setItem('player', player.value);
    localStorage.setItem('latest', " ");
    const user = {
        userName: player.value,
        highScore: " "
    }
    
    await fetch(`/createuser`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
})