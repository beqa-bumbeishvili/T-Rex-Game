import Dino = require("./dino.ts");

class TRexGame {
    renderer: any;
    stage: PIXI.Container;
    dino: any;
    road: PIXI.Sprite;
    obstacle: PIXI.Sprite;
    bird: PIXI.Sprite;
    constructor(stage, renderer) {
        this.renderer = renderer;
        this.stage = stage;
        this.road = new PIXI.Sprite(PIXI.loader.resources["path"].texture);
        this.road.position.set(0, 130);
        this.road.width = this.renderer.width * 2;
        this.dino = new Dino(this.stage);
        this.dino.showTRex();
        this.stage.addChild(this.road);
        this.animateRoad();
    }

    animateRoad() {
        let _this = this;
        let i = 0;
        setInterval(function () {
            _this.road.x--;
            i++;
            if (i == _this.road.width / 2){
                _this.road.x = 0;
                i=0;
            }
        }, 10)
    }
}

export = TRexGame;