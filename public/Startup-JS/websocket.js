const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

function configureWebSocket() {
    socket.onopen = (event) => {
        console.log("WS connected");
    };
    socket.onclose = (event) => {
        console.log("WS Disconnected");
    };
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        displayMsg(msg);
    };
}

function createTableRow(index, player, latestScore) {
    var row = document.createElement("tr");
    var indexCell = document.createElement("td");
    var playerCell = document.createElement("td");
    var latestScoreCell = document.createElement("td");

    indexCell.textContent = index;
    playerCell.textContent = player;
    latestScoreCell.textContent = latestScore;

    row.appendChild(indexCell);
    row.appendChild(playerCell);
    row.appendChild(latestScoreCell);

    return row;
}

function displayMsg(msg) {
    const el = document.querySelector("table:nth-child(2) > tbody");
    if (el) {
        const row = createTableRow(msg.timeStamp, msg.userName, msg.highScore);
        el.insertBefore(row, el.children[1]);
        el.removeChild(el.lastElementChild);
    }
}

window.sendMsg = function (event) {
    socket.send(JSON.stringify(event));
}

configureWebSocket();
