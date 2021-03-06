import Dino = require("./dino.ts");

class TRexGame {
    renderer: any;
    stage: PIXI.Container;
    dino: any;
    road: PIXI.Sprite;
    obstacles: PIXI.Container;
    currentObstacle: any;
    clouds: PIXI.Container;
    roadInterval: any;
    obstaclesInterval: any;
    scoreCounter: PIXI.Text;
    constructor(stage, renderer) {
        this.renderer = renderer;
        this.stage = stage;
        this.roadInterval = false;
        this.obstaclesInterval = false;
        this.buildRoad();
        this.buildObstacles();
        this.setScoreCounter();
        this.stage.addChild(this.road);
        this.dino = new Dino(this.stage);
        this.stage.addChild(this.obstacles);
        this.dino.animateTRex();
        this.addClouds();
        this.animateRoad();
        this.showObstacles();
        this.listenJumpEvent();
    }

    gameOver(){
        let _this = this;
        let gameOverMessage = new PIXI.Sprite(PIXI.loader.resources["gameOver"].texture);
        gameOverMessage.position.set(210,33);
        let restartButton = new PIXI.Sprite(PIXI.loader.resources["restart"].texture);
        restartButton.position.set(288,65);
        this.stage.addChild(gameOverMessage);
        this.stage.addChild(restartButton);
        this.stage.getChildAt(this.stage.children.length - 1).interactive = true;
        this.stage.getChildAt(this.stage.children.length - 1).buttonMode = true;
        this.stage.getChildAt(this.stage.children.length - 1).click = function(){
            _this.stage.removeChildren();
            let game = new TRexGame(_this.stage, _this.renderer);
        }
    }


    addClouds() {
        this.clouds = new PIXI.Container;
        this.clouds.addChild(new PIXI.Sprite(PIXI.loader.resources["cloud"].texture));
        this.clouds.getChildAt(0).position.set(100, 40);
        this.clouds.addChild(new PIXI.Sprite(PIXI.loader.resources["cloud"].texture));
        this.clouds.getChildAt(1).position.set(250, 10);
        this.clouds.addChild(new PIXI.Sprite(PIXI.loader.resources["cloud"].texture));
        this.clouds.getChildAt(2).position.set(480, 50);
        this.stage.addChild(this.clouds);
    }

    setScoreCounter(){
        let textStyle = {
            fontSize: '15px',
            fill: '#737373'
        };
        
        this.scoreCounter = new PIXI.Text("0", textStyle);
        this.scoreCounter.position.set(530,5);
        this.stage.addChild(this.scoreCounter);
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
             //   window.removeEventListener("keydown", );    
             this.stopGame();        
            }
    }

    stopGame() {
        clearInterval(this.dino.walkInterval);
        clearInterval(this.dino.jumpInterval);
        clearInterval(this.roadInterval);
        clearInterval(this.obstaclesInterval);
        this.dino.defaultAppearance.visible = false;
        this.dino.firstStep.visible = false;
        this.dino.secondStep.visible = false;
        if (this.dino.defaultAppearance.y < 90)
            this.dino.crashAppearance.y = this.dino.defaultAppearance.y;
        this.dino.crashAppearance.visible = true;
        this.gameOver();
    }

    showObstacles() {
        let _this = this;
        let i = 0;
        this.obstaclesInterval = setInterval(function () {
            _this.crashTest();
            _this.obstacles.getChildAt(0).x -= 2;

            if (_this.obstacles.getChildAt(0).x < 370) {
                _this.obstacles.getChildAt(1).visible = true;
                if (_this.obstacles.getChildAt(0).x < 80)
                    _this.currentObstacle = _this.obstacles.getChildAt(0);
            }

            if (_this.obstacles.getChildAt(1).visible == true)
                _this.obstacles.getChildAt(1).x -= 2;

            if (_this.obstacles.getChildAt(1).x < 370) {
                _this.obstacles.getChildAt(2).visible = true;
                if (_this.obstacles.getChildAt(1).x < 80)
                    _this.currentObstacle = _this.obstacles.getChildAt(1);
            }

            if (_this.obstacles.getChildAt(2).visible == true) {
                _this.obstacles.getChildAt(2).x -= 2;
                if (_this.obstacles.getChildAt(2).x < 80)
                    _this.currentObstacle = _this.obstacles.getChildAt(2);
            }

            if (_this.obstacles.getChildAt(0).x < -20)
                _this.obstacles.getChildAt(0).x = 580;

            if (_this.obstacles.getChildAt(1).x < -20)
                _this.obstacles.getChildAt(1).x = 580;

            if (_this.obstacles.getChildAt(2).x < -20)
                _this.obstacles.getChildAt(2).x = 580;
        }, 8)
    }

    animateRoad() {
        let _this = this;
        let i = 0;
        let scoreCounter = 0;
        this.roadInterval = setInterval(function () {
            _this.scoreCounter.text =""+Math.ceil(scoreCounter/10);
            _this.road.x--;
            i++;
            scoreCounter++;
            if (i == _this.road.width / 2) {
                _this.road.x = 0;
                i = 0;
            }
        }, 4)
    }

    listenJumpEvent() {
        let _this = this;
        window.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case 32: {
                    if (_this.dino.jumpInterval == false && _this.dino.crashAppearance.visible == false)   
                        _this.dino.jump();
                    break;
                }
                case 38: {
                    if (_this.dino.jumpInterval == false && _this.dino.crashAppearance.visible == false)
                        _this.dino.jump();
                    break;
                }
            }
        });
    }


}

export = TRexGame;