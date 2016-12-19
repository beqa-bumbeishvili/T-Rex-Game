///<reference path="../../lib/pixi.js.d.ts" />
import TRexGame = require("./game.ts");
let autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let stage = new PIXI.Container(),
    renderer = PIXI.autoDetectRenderer(700, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(renderer.view);
setInterval(function () { renderer.render(stage); }, 30);
let clasi = new TRexGame(stage, renderer);
loader
    .add("background", "app/assets/resources/background.jpg")
    .load(function () { clasi.experimentalMethod(); });