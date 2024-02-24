
// import kaboom lib
import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

// initialize kaboom context
kaboom();

loadSprite("background", "clouds.jpeg.webp");
add([
    sprite("background"),
    scale(3.3,3.8),
    pos(0, 0),
]);

// add a piece of text at position (120, 80)
add([
    text("Score: "),
    pos(800, 40),
]);

loadSprite("basketball", "basketball.png")

const basketball = add([
    sprite("basketball"),
    pos(100, 400),
    scale(.12),
    area(),
])

onKeyPress("down", () => {
    basketball.move(0, 3000)
})

onKeyPress("up", () => {
    basketball.move(0, -3000)
})
