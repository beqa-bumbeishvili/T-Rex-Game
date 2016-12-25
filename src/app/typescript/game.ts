import Dino = require("./dino.ts");

class TRexGame {
    renderer: any;
    stage: PIXI.Container;
    dino: any;
    road: PIXI.Sprite;
    obstacles: PIXI.Container;
    currentObstacle: any;
    bird: PIXI.Sprite;
    constructor(stage, renderer) {
        this.renderer = renderer;
        this.stage = stage;
        this.buildRoad();
        this.buildObstacles();
        this.stage.addChild(this.road);
        this.dino = new Dino(this.stage);
        this.stage.addChild(this.obstacles);
        this.dino.animateTRex();
        this.animateRoad();
        this.showObstacles();
        this.listenJumpEvent();
    }

    buildRoad() {
        this.road = new PIXI.Sprite(PIXI.loader.resources["path"].texture);
        this.road.position.set(0, 130);
        this.road.width = this.renderer.width * 2;
    }

    buildObstacles() {
        this.obstacles = new PIXI.Container();
        this.obstacles.addChild(new PIXI.Sprite(PIXI.loader.resources["one"].texture));
        this.obstacles.addChild(new PIXI.Sprite(PIXI.loader.resources["two"].texture));
        this.obstacles.addChild(new PIXI.Sprite(PIXI.loader.resources["three"].texture));
        this.obstacles.getChildAt(0).position.set(580, 108);
        this.obstacles.getChildAt(0).visible = true;
        this.currentObstacle = this.obstacles.getChildAt(0);
        this.obstacles.getChildAt(1).position.set(580, 108);
        this.obstacles.getChildAt(1).visible = false;
        this.obstacles.getChildAt(2).position.set(580, 108);
        this.obstacles.getChildAt(2).visible = false;
    }

    crashTest() {
        if (this.currentObstacle.x < (this.dino.firstStep.x + 40) && (this.currentObstacle.x > this.dino.firstStep.x + 2))
            if (this.dino.defaultAppearance.y + 45 > this.currentObstacle.y) {
                alert('crash!');
            }
    }

    showObstacles() {
        let _this = this;
        let i = 0;
        setInterval(function () {

            _this.crashTest();
            _this.obstacles.getChildAt(0).x -= 2;

            if (_this.obstacles.getChildAt(0).x < 400) {
                _this.obstacles.getChildAt(1).visible = true;
                if (_this.obstacles.getChildAt(0).x < 80)
                    _this.currentObstacle = _this.obstacles.getChildAt(0);
            }


            if (_this.obstacles.getChildAt(1).visible == true)
                _this.obstacles.getChildAt(1).x -= 2;

            if (_this.obstacles.getChildAt(1).x < 400) {
                _this.obstacles.getChildAt(2).visible = true;
                if (_this.obstacles.getChildAt(1).x < 80)
                    _this.currentObstacle = _this.obstacles.getChildAt(1);
            }

            if (_this.obstacles.getChildAt(2).visible == true) {
                _this.obstacles.getChildAt(2).x -= 2;
                if (_this.obstacles.getChildAt(1).x < 80)
                    _this.currentObstacle = _this.obstacles.getChildAt(2);
            }

            if (_this.obstacles.getChildAt(0).x < -20)
                _this.obstacles.getChildAt(0).x = 580;

            if (_this.obstacles.getChildAt(1).x < -20)
                _this.obstacles.getChildAt(1).x = 580;

            if (_this.obstacles.getChildAt(2).x < -20)
                _this.obstacles.getChildAt(2).x = 580;
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
        }, 5)
    }

    listenJumpEvent() {
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