// import kaboom lib
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({
    background: [39, 92, 117] // The RGB code
  })

loadSprite("ground", "Startup-IMG/ground.png");
loadSprite("background", "Startup-IMG/clouds.jpeg.webp");
loadSprite("basketball", "Startup-IMG/basketball.png");
loadSprite("hoop", "Startup-IMG/hoop.png");
loadSprite("wall", "Startup-IMG/wall.png.webp");
let screen_width = width()/2.344;
const speed = width();
let score = 0;

scene("game", () => {

    // pull a cool track from soundcloud using a third party API
    const url = 'https://soundcloud.com/oembed';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'format': 'json',
            'url': 'https://soundcloud.com/haunu/home-resonance-slowed-blade-runner-2049-song'
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
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    
    const ground = add([
        sprite("ground"),
        scale(0.9),
        pos(-10, 700),
        area(),
        "ground",
        body({isStatic: true})
    ])
    const wall = add([
        sprite("wall"),
        scale(),
        pos(-670,50),
        area(scale(0.8))
    ])
    const basketball = add([
        sprite("basketball"),
        pos(100, 400),
        scale(.12),
        setGravity(1500),
        area(scale(.5)),
        body()
    ])
    loop(1, () => {
        const hoop = add([
            sprite("hoop"),
            pos(1800, rand(100, 800)),
            rotate(270),
            scale(.8),
            move(LEFT, speed),
            area(),
            "hoop"
        ]);
    });
    
    onKeyDown("down", () => {
        basketball.jump(-600)
    })
    
    onKeyDown("up", () => {
        basketball.jump(600);
    })

    const scoreLabel = add([
        text("Score: " + score),
        pos(screen_width, 40)
    ])
    basketball.onCollide("hoop", (hoop) => {
        score++;
        destroy(hoop);
    });
    onUpdate(() => {
        scoreLabel.text = "Score: " + score;
    });
    wall.onCollide("hoop", () => {
        go("lose", score);
    })
});

scene("lose", async (score) => {
    localStorage.setItem('latest', score);
    const currentPlayer = localStorage.getItem('player');
    const userScore = {
        userName: currentPlayer,
        highScore: score
    }

    // update high scores
    fetch(`/updatehigh`, {
        method: 'PUT',
        headers:
         {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userScore)
    });


    // update recent scores
    fetch(`/updaterecent`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userScore)
    });

    // update users high score
    fetch(`/${currentPlayer}/${score}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
    });

    window.location.replace("basketflyer.html");

});

go("game")