console.log("you are on the login screen!")

const player = document.querySelector("#name");
const submitName = document.querySelector("#submitname");

submitName.addEventListener('click',  async function() {
    console.log("you are on the login screen!")
    localStorage.setItem('player', player.value);
    const user = {
        userName: player.value,
        highScore: 0
    }
    
    await fetch(`/createuser`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
})