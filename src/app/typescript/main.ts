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
    .add("path", "app/assets/way/path.png")
    .load(function () { 
    let game = new TRexGame(stage, renderer);
 });