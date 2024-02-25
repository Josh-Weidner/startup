// import kaboom lib
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom()

loadSprite("background", "clouds.jpeg.webp");
loadSprite("basketball", "basketball.png")
loadSprite("hoop", "hoop.png")

scene("instructions", () => {

})

scene("game", () => {

    add([
        sprite("background"),
        scale(3.3,3.8),
        pos(0, 0),
    ]);
    
    const basketball = add([
        sprite("basketball"),
        pos(100, 400),
        scale(.12),
        area(),
    ])
    
    loop(2, () => {
        const hoop = add([
            sprite("hoop"),
            pos(1800, rand(100, 1000)),
            rotate(270),
            scale(.8),
            move(LEFT, 800),
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

    let score = 0;
    const scoreLabel = add([
        text("Score: " + score),
        pos(800, 40)
    ])

    basketball.onCollide("hoop", () => {
        score = score + 1;
    });

    onUpdate(() => {
        scoreLabel.text = "Score: " + score;
    });
});

scene("lose", (score) => {

    window.location.replace("basketflyer.html");

});

go("game")