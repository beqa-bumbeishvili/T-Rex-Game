class Dino {
    stage: PIXI.Container;
    defaultAppearance: PIXI.Sprite;
    crashAppearance: PIXI.Sprite;
    firstStep: PIXI.Sprite;
    secondStep: PIXI.Sprite;
    walkInterval: any;
    public jumpInterval: any;
    constructor(stage) {
        this.stage = stage;
        this.setDefaultAppearance();
        this.firstStepAppearance();
        this.secondStepAppearance();
        this.setCrashAppearance();
        this.jumpInterval = false;
        this.stage.addChild(this.defaultAppearance);
        this.stage.addChild(this.firstStep);
        this.stage.addChild(this.secondStep);
        this.stage.addChild(this.crashAppearance);
    }

    setDefaultAppearance() {
        this.defaultAppearance = new PIXI.Sprite(PIXI.loader.resources["T-RexNormal"].texture);
        this.defaultAppearance.width = 42;
        this.defaultAppearance.height = 45;
        this.defaultAppearance.position.set(30, 100);
    }

    firstStepAppearance() {
        this.firstStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep1"].texture);
        this.firstStep.width = 42;
        this.firstStep.height = 45;
        this.firstStep.position.set(30, 100);
        this.firstStep.visible = false;
    }

    secondStepAppearance() {
        this.secondStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep2"].texture);
        this.secondStep.width = 42;
        this.secondStep.height = 45;
        this.secondStep.position.set(30, 100);
        this.secondStep.visible = false;
    }

    setCrashAppearance() {
        this.crashAppearance = new PIXI.Sprite(PIXI.loader.resources["crash"].texture);
        this.crashAppearance.width = 42;
        this.crashAppearance.height = 45;
        this.crashAppearance.position.set(30, 100);
        this.crashAppearance.visible = false;
    }

    public animateTRex() {
        let _this = this;
        let i = 0;
        this.walkInterval = setInterval(function () {
            i++;
            if (i % 2 == 0) {
                _this.defaultAppearance.visible = false;
                _this.secondStep.visible = false;
                _this.firstStep.visible = true;
            }
            else {
                _this.firstStep.visible = false;
                _this.secondStep.visible = true;
            }
        }, 100)
    }

    public jump() {
        clearInterval(this.walkInterval);
        this.firstStep.visible = false;
        this.secondStep.visible = false;
        this.defaultAppearance.visible = true;
        let _this = this;
        let i = 0;
        //let sound = PIXI.audioManager.getAudio("hitSound");
       // sound.play();
        this.jumpInterval = setInterval(function () {
            i++;
            if (i < 35) {
                if (i < 25)
                    _this.defaultAppearance.y -= 3;
                else _this.defaultAppearance.y -= 2;
            }
            else {
                if (i >=35 && i < 50)
                    _this.defaultAppearance.y += 2;
                else _this.defaultAppearance.y += 3;
            }
            if (_this.defaultAppearance.y >= 100) {
                _this.animateTRex();
                clearInterval(_this.jumpInterval);
                _this.jumpInterval = false;
            }
        }, 10);
    }
}

export = Dino;