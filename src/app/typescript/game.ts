import Dino = require("./dino.ts");

class TRexGame {
    renderer :any;
    stage: PIXI.Container;
    dino: any;
    way: PIXI.Sprite;
    obstacle: PIXI.Sprite;
    bird: PIXI.Sprite;
    constructor(stage,renderer) {
        this.renderer= renderer;
        this.stage = stage;
        this.way = new PIXI.Sprite(PIXI.loader.resources["path"].texture);
        this.way.position.set(0,130);
        this.way.width=this.renderer.width;
        this.dino = new Dino(this.stage);
        this.dino.showTRex();
        this.stage.addChild(this.way);
    }
}

export = TRexGame;