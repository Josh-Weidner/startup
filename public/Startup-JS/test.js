// import kaboom lib
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom({
    background: [39, 92, 117] // The RGB code
  })

loadSprite("background", "Startup-IMG/clouds.jpeg.webp");
loadSprite("basketball", "Startup-IMG/basketball.png");
loadSprite("hoop", "Startup-IMG/hoop.png");
loadSprite("wall", "Startup-IMG/wall.png.webp");

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
        
    // add([
    //     sprite("background"),
    //     scale(3.3,3.8),
    //     pos(0, 0),
    //     "wall"
    // ]);

    const wall = add([
        sprite("wall"),
        area(),
        scale(1.5),
        pos(-900, 10),
    ]);
    
    const basketball = add([
        sprite("basketball"),
        pos(100, 400),
        scale(.12),
        area(scale(.5)),
    ])
    
    loop(1, () => {
        const hoop = add([
            sprite("hoop"),
            pos(1800, rand(100, 1000)),
            rotate(270),
            scale(.8),
            move(LEFT, 1600),
            area(),
            "hoop"
        ])
    })
    
    onKeyDown("down", () => {
        basketball.move(0, 1100)
    })
    
    onKeyDown("up", () => {
        basketball.move(0, -1100)
    })

    const scoreLabel = add([
        text("Score: " + score),
        pos(800, 40)
    ])

    basketball.onCollide("hoop", (hoop) => {
        score = score + 1;
        destroy(hoop);
    });

    wall.onCollide("hoop", (hoop) => {
        go("lose", score);
    })

    onUpdate(() => {
        scoreLabel.text = "Score: " + score;
    });  

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
        headers: {
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