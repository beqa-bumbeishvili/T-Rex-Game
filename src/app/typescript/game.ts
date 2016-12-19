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
        this.obstacle = new PIXI.Sprite(PIXI.loader.resources["one"].texture);
        this.obstacle.position.set(580, 108);
        this.dino = new Dino(this.stage);
        this.stage.addChild(this.road);
        this.stage.addChild(this.obstacle);
        this.dino.animateTRex();
        this.animateRoad();
        this.showObstacles();
        this.jumpEvent();
    }

    showObstacles() {
        let _this = this;
        let i = 0;
        setInterval(function () {
            i++;
            _this.obstacle.x--;
           /* if (_this.dino.visual.x + _this.dino.visual.width > _this.obstacle.x && _this.dino.visual.x < _this.obstacle.x + _this.obstacle.width)
                if (_this.dino.visual.y - _this.dino.height <= _this.obstacle.y)
                    alert('hit!');*/
            if (i == 1200) {
                i = 0;
            }
        }, 10)
    }

    animateRoad() {
        let _this = this;
        let i = 0;
        setInterval(function () {
            _this.road.x--;
            i++;
            if (i == _this.road.width / 2) {
                _this.road.x = 0;
                i = 0;
            }
        }, 10)
    }

    jumpEvent() {
        let _this = this;
        window.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case 32: {
                    if (_this.dino.jumpInterval == false)
                        _this.dino.jump();
                    break;
                }
                case 38: {
                    if (_this.dino.jumpInterval == false)
                        _this.dino.jump();
                    break;
                }
            }
        });
    }


}

export = TRexGame;