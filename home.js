const player = document.querySelector("#name");
const submitName = document.querySelector("#submitname");

submitName.addEventListener('click', function() {
    localStorage.setItem('player', player.value);
})