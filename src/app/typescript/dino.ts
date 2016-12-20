class Dino {
    stage: PIXI.Container;
    defaultAppearance: PIXI.Sprite;
    firstStep: PIXI.Sprite;
    secondStep: PIXI.Sprite;
    walkInterval: any;
    public jumpInterval: any;
    constructor(stage) {
        this.stage = stage;
        this.setDefaultAppearance();
        this.firstStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep1"].texture);
        this.firstStep.width = 42;
        this.firstStep.height = 45;
        this.firstStep.position.set(30, 90);
        this.firstStep.visible = false;
        this.secondStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep2"].texture);
        this.secondStep.width = 42;
        this.secondStep.height = 45;
        this.secondStep.position.set(30, 90);
        this.secondStep.visible = false;
        this.jumpInterval = false;
        this.stage.addChild(this.defaultAppearance);
        this.stage.addChild(this.firstStep);
        this.stage.addChild(this.secondStep);
    }

    setDefaultAppearance() {
        this.defaultAppearance = new PIXI.Sprite(PIXI.loader.resources["T-RexNormal"].texture);
        this.defaultAppearance.width = 42;
        this.defaultAppearance.height = 45;
        this.defaultAppearance.position.set(30, 90);
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
        this.jumpInterval = setInterval(function () {
            i++;
            if (i < 40) {
                _this.defaultAppearance.y -= 2;
            }
            else {
                _this.defaultAppearance.y += 2;
            }
            if (_this.defaultAppearance.y == 90) {
                _this.animateTRex();
                clearInterval(_this.jumpInterval);
                _this.jumpInterval = false;
            }
        }, 10);
    }
}

export = Dino;