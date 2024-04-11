// import kaboom lib
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({
    background: [0, 0, 0, 0] // The RGB code
  })

loadSprite("ground", "Startup-IMG/ground.png");
loadSprite("background", "Startup-IMG/clouds.jpeg.webp");
loadSprite("basketball", "Startup-IMG/basketball.png");
loadSprite("hoop", "Startup-IMG/hoop.png");
loadSprite("wall", "Startup-IMG/wall.png.webp");
const speed = width();
let score = 0;

scene("game", () => {
    
    const ground = add([
        sprite("ground"),
        scale((width()*height())*0.00000075),
        pos(width()*-.01, height()*.87),
        area(),
        "ground",
        body({isStatic: true})
    ])
    const wall = add([
        sprite("wall"),
        scale((width()*height())*0.000001),
        pos(width()*-.65,0),
        area()
    ])
    const basketball = add([
        sprite("basketball"),
        pos(width()*0.09, height()*.25),
        scale((width()*height())*0.00000011),
        setGravity(2000),
        area(scale(.5)),
        body()
    ])
    loop(1, () => {
        const hoop = add([
            sprite("hoop"),
            pos(width()*1.1, rand(height()*0.15, height()*0.9)),
            rotate(270),
            scale((width()*height())*0.0000007),
            move(LEFT, speed),
            area(),
            "hoop"
        ]);
    });
    
    onKeyDown("down", () => {
        basketball.jump(-700)
    })
    
    onKeyDown("up", () => {
        basketball.jump(700);
    })

    const scoreLabel = add([
        text("Score: " + score),
        pos(width()/2.344, 40)
    ])
    basketball.onCollide("hoop", (hoop) => {
        score++;
        destroy(hoop);
    });
    basketball.onCollide("ground", () => {
        basketball.jump(800);
    })
    onUpdate(() => {
        scoreLabel.text = "Score: " + score;
    });
    wall.onCollide("hoop", () => {
        go("lose", score);
    })
});

scene("lose", async (score) => {
    if (localStorage.getItem('playCount') != null) {
        const count = parseInt(localStorage.getItem('playCount'));
        localStorage.setItem('playCount', count + 1);
    }
    else {localStorage.setItem('playCount', 1)}
    localStorage.setItem('latest', score);
    const currentPlayer = localStorage.getItem('userName');
    const currentTime = new Date();
    const formattedTime = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')} ${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
    const userScore = {
        userName: currentPlayer,
        highScore: score,
        timeStamp: formattedTime
    }

    // update users high score
    async function updatePlayerScore(userScore) {
        try {
            const response = await fetch(`/api/updatePlayerScore`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userScore)
            });
    
            if (response.ok) {
                // Database update was successful
                console.log("player highscore updated")
            } else {
                // Handle error response
                console.error('Error updating player score:', response.statusText);
                // Optionally display an error message to the user
            }
        } catch (error) {
            // Handle fetch error
            console.error('Error updating player score:', error);
            // Optionally display an error message to the user
        }
    }

    sendMsg(userScore);

    // update scores
    fetch(`/api/updateScores`, {
        method: 'PUT',
        headers:
         {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userScore)
    });

    if (score > localStorage.getItem('highScore') && localStorage.getItem("player")) {
        localStorage.setItem("highScore", score);
        updatePlayerScore(userScore);
    }
});

go("game")