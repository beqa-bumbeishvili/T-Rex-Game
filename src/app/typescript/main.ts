///<reference path="../../lib/pixi.js.d.ts" />
import TRexGame = require("./game.ts");
let autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(600, 150,{backgroundColor:0xF7F7F7});
document.body.appendChild(renderer.view);
setInterval(function () { renderer.render(stage); }, 30);
loader
    .add("T-RexNormal", "app/assets/dino/dino.png")
    .add("T-RexStep1", "app/assets/dino/step1.png")
    .add("T-RexStep2", "app/assets/dino/step2.png")
    .add("crash", "app/assets/dino/crash.png")
    .add("one", "app/assets/obstacles/1.png")
    .add("two", "app/assets/obstacles/2.png")
    .add("three", "app/assets/obstacles/3.png")
    .add("path", "app/assets/way/path.png")
    .add("cloud", "app/assets/resources/cloud.png")
    .add("restart", "app/assets/resources/restart.png")
    .add("gameOver", "app/assets/resources/gameOver.png")
    .load(function () { 
    let game = new TRexGame(stage, renderer);
 });