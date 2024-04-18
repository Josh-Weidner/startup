// import kaboom lib
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

kaboom({
    background: [0, 0, 0, 0] // The RGB code
  })

  loadSprite("ground", "Startup-IMG/ground.png");
  loadSprite("background", "Startup-IMG/clouds.jpeg.webp");
  loadSprite("basketball", "Startup-IMG/basketball.png");
  loadSprite("hoop", "Startup-IMG/hoop.png");
  loadSprite("wall", "Startup-IMG/wall.png.webp");
  loadSprite("hand", "Startup-IMG/hand.png");
  loadSound("point", "Startup-IMG/point.wav");
  let speed = width() * .45;
  let score = 0;
  
  scene("game", () => {
      
      const ground = add([
          sprite("ground"),
          pos(0, height()),
          area(),
          scale(2),
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
          setGravity(2200),
          area(scale(.5)),
          body()
      ])
      loop(1.1, () => {
          const hoop = add([
              sprite("hoop"),
              pos(width(), rand(height(), height()*.35)),
              rotate(270),
              move(LEFT, speed),
              area(),
              "hoop"
          ]);
      });
      loop(1.1, () => {
          const hand = add([
              sprite("hand"),
              pos(width()*1.25, rand(height()*0.15, height()*0.7)),
              move(LEFT, speed),
              area(scale(0.5)),
              "hand"
          ]);
      });
      
      onKeyDown("down", () => {
          basketball.jump(-800)
      })
      
      onKeyDown("up", () => {
          basketball.jump(800);
      })
  
      const scoreLabel = add([
          text("Score: " + score),
          pos(width()/2.2, 40),
      ])
      basketball.onCollide("hoop", (hoop) => {
          score++;
          if (score < 40) {
            speed = speed * 1.025;
          }
          play("point");
          destroy(hoop);
      });
      basketball.onCollide("hand", () => {
          go("lose", score)
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
    const currentPlayer = localStorage.getItem('userName');
    const currentTime = new Date();
    const formattedTime = `${currentTime.getFullYear()}-${(currentTime.getMonth() + 1).toString().padStart(2, '0')}-${currentTime.getDate().toString().padStart(2, '0')} ${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
    const userScore = {
        userName: currentPlayer,
        highScore: score,
        timeStamp: formattedTime
    }

    if (localStorage.getItem('playCount') != 0) {
        const count = parseInt(localStorage.getItem('playCount'));
        localStorage.setItem('playCount', count + 1);
    }
    else {
        localStorage.setItem('playCount', 1);
    }

    localStorage.setItem('latest', score);

    window.sendMsg = function (event) {
        socket.send(JSON.stringify(event));
    }

    // update users high score
    async function updatePlayerScore(userScore) {
        try {
            console.log("we are going to update the database");
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

    // update scores
    fetch(`/api/updateScores`, {
        method: 'PUT',
        headers:
         {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userScore)
    });

    if (score > localStorage.getItem('highScore') && localStorage.getItem("userName")) {
        sendMsg(userScore);
        localStorage.setItem("highScore", score);
        updatePlayerScore(userScore);
    }
});

go("game")