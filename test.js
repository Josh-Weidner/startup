// import kaboom lib
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom()

loadSprite("background", "clouds.jpeg.webp");
loadSprite("basketball", "basketball.png")
loadSprite("hoop", "hoop.png")
loadSprite("wall", "wall.png.webp") 

let highScore = 0;
let score = 0;

scene("game", () => {

    add([
        sprite("background"),
        scale(3.3,3.8),
        pos(0, 0),
        "wall"
    ]);

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
        area(),
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
        basketball.move(0, 1000)
    })
    
    onKeyDown("up", () => {
        basketball.move(0, -1000)
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
        go("lose");
    })

    onUpdate(() => {
        scoreLabel.text = "Score: " + score;
        localStorage.setItem("latestScore", score);
        if (score > localStorage.getItem('highScore')) {
            localStorage.setItem('highScore', score)
        }
    });

});

scene("lose", (score) => {
    window.location.replace("basketflyer.html");

});

go("game")