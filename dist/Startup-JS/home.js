const player = document.querySelector("#name");
const password = document.querySelector("#pw");
const createUser = document.querySelector("#createUser");
const login = document.querySelector("#login");
const logout = document.querySelector("#logout");

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
        const frame = document.querySelector("iframe");
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

createUser.addEventListener('click',  async function() {
    const user = {
        userName: player.value,
        password: password.value,
        highScore: 0
    }
    
    const response = await fetch(`/api/auth/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (response.ok) {
        localStorage.clear();
        localStorage.setItem('player', player.value);
        window.location = "basketflyer.html";
        console.log('user created');
    } else {
        createUser.innerText = "Name already in use";
    }
})

login.addEventListener('click', async function() {
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ userName: player.value, password: password.value})
    });
    if (response.ok) {
        localStorage.clear();
        localStorage.setItem('player', player.value);
        window.location = "basketflyer.html";
        console.log('login successful');
    } else {
        login.innerText = "Incorrect username or password";
    }
})

logout.addEventListener('click', async function() {
    localStorage.clear();
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = '/'));
})

