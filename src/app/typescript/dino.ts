class Dino {
    stage:PIXI.Container;
    visual:PIXI.Sprite;
    constructor(stage) {
        this.stage = stage;
        this.visual = new PIXI.Sprite(PIXI.loader.resources["T-RexNormal"].texture);
        this.visual.width=42;
        this.visual.height=45;
        this.visual.position.set(30,80);
    }
    public showTRex(){
        this.stage.addChild(this.visual);
    }
}


export = Dino;