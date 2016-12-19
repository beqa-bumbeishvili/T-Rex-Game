class Dino {
    stage: PIXI.Container;
    visual: PIXI.Sprite;
    firstStep: PIXI.Sprite;
    secondStep: PIXI.Sprite;
    constructor(stage) {
        this.stage = stage;
        this.visual = new PIXI.Sprite(PIXI.loader.resources["T-RexNormal"].texture);
        this.visual.width = 42;
        this.visual.height = 45;
        this.visual.position.set(30, 80);
        this.firstStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep1"].texture);
        this.firstStep.width = 42;
        this.firstStep.height = 45;
        this.firstStep.position.set(30, 80);
        this.secondStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep2"].texture);
        this.secondStep.width = 42;
        this.secondStep.height = 45;
        this.secondStep.position.set(30, 80);
        this.stage.addChild(this.visual);
        this.stage.addChild(this.firstStep);
        this.stage.addChild(this.secondStep);
    }
    public animateTRex() {
        let _this = this;
        let i = 0;
        _this.visual.visible = false;
        _this.firstStep.visible = false;
        _this.secondStep.visible = false;
        setInterval(function () {
            i++;
            if (i % 2 == 0) {
                _this.firstStep.visible = true;
                _this.secondStep.visible = false;
            }
            else {
                _this.firstStep.visible = false;
                _this.secondStep.visible = true;
            }
        }, 100)
    }
}

export = Dino;