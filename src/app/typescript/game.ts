import Dino = require("./dino.ts");

class TRexGame {
    renderer :any;
    stage: PIXI.Container;
    dino: any;
    obstacle: PIXI.Sprite;
    bird: PIXI.Sprite;
    constructor(stage,renderer) {
        this.renderer= renderer;
        this.stage = stage;
        this.dino = new Dino();
    }
    public experimentalMethod() {
       this.stage.addChild(new PIXI.Sprite(PIXI.loader.resources["background"].texture));
       
        console.log('text from experimentalMethod');
    }
}

export = TRexGame;