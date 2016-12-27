/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	///<reference path="../../lib/pixi.js.d.ts" />
	var TRexGame = __webpack_require__(2);
	var autoDetectRenderer = PIXI.autoDetectRenderer, loader = PIXI.loader, resources = PIXI.loader.resources, Sprite = PIXI.Sprite;
	var stage = new PIXI.Container(), renderer = PIXI.autoDetectRenderer(600, 150, { backgroundColor: 0xF7F7F7 });
	document.body.appendChild(renderer.view);
	setInterval(function () { renderer.render(stage); }, 30);
	loader
	    .add("T-RexNormal", "app/assets/dino/dino.png")
	    .add("T-RexStep1", "app/assets/dino/step1.png")
	    .add("T-RexStep2", "app/assets/dino/step2.png")
	    .add("crash", "app/assets/dino/crash.png")
	    .add("one", "app/assets/obstacles/1.png")
	    .add("two", "app/assets/obstacles/2.png")
	    .add("three", "app/assets/obstacles/3.png")
	    .add("path", "app/assets/way/path.png")
	    .add("cloud", "app/assets/resources/cloud.png")
	    .add("gameOver", "app/assets/resources/gameOver.png")
	    .load(function () {
	    var game = new TRexGame(stage, renderer);
	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Dino = __webpack_require__(3);
	var TRexGame = (function () {
	    function TRexGame(stage, renderer) {
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
	    TRexGame.prototype.addClouds = function () {
	        this.clouds = new PIXI.Container;
	        this.clouds.addChild(new PIXI.Sprite(PIXI.loader.resources["cloud"].texture));
	        this.clouds.getChildAt(0).position.set(100, 40);
	        this.clouds.addChild(new PIXI.Sprite(PIXI.loader.resources["cloud"].texture));
	        this.clouds.getChildAt(1).position.set(250, 20);
	        this.clouds.addChild(new PIXI.Sprite(PIXI.loader.resources["cloud"].texture));
	        this.clouds.getChildAt(2).position.set(480, 50);
	        this.stage.addChild(this.clouds);
	    };
	    TRexGame.prototype.setScoreCounter = function () {
	        var textStyle = {
	            //  fontFamily: 'Arial',
	            fontSize: '15px',
	            //   fontStyle: 'italic',
	            // fontWeight: 'bold',
	            fill: '#737373'
	        };
	        this.scoreCounter = new PIXI.Text("000000", textStyle);
	        this.scoreCounter.position.set(500, 5);
	        this.stage.addChild(this.scoreCounter);
	    };
	    TRexGame.prototype.buildRoad = function () {
	        this.road = new PIXI.Sprite(PIXI.loader.resources["path"].texture);
	        this.road.position.set(0, 130);
	        this.road.width = this.renderer.width * 2;
	    };
	    TRexGame.prototype.buildObstacles = function () {
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
	    };
	    TRexGame.prototype.crashTest = function () {
	        if (this.currentObstacle.x < (this.dino.firstStep.x + 40) && (this.currentObstacle.x > this.dino.firstStep.x + 2))
	            if (this.dino.defaultAppearance.y + 45 > this.currentObstacle.y) {
	                this.stopGame();
	            }
	    };
	    TRexGame.prototype.stopGame = function () {
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
	    };
	    TRexGame.prototype.showObstacles = function () {
	        var _this = this;
	        var i = 0;
	        this.obstaclesInterval = setInterval(function () {
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
	        }, 10);
	    };
	    TRexGame.prototype.animateRoad = function () {
	        var _this = this;
	        var i = 0;
	        var scoreCounter = 0;
	        this.roadInterval = setInterval(function () {
	            _this.scoreCounter.text = "" + Math.ceil(scoreCounter / 10);
	            _this.road.x--;
	            i++;
	            scoreCounter++;
	            if (i == _this.road.width / 2) {
	                _this.road.x = 0;
	                i = 0;
	            }
	        }, 5);
	    };
	    TRexGame.prototype.listenJumpEvent = function () {
	        var _this = this;
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
	    };
	    return TRexGame;
	}());
	module.exports = TRexGame;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Dino = (function () {
	    function Dino(stage) {
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
	    Dino.prototype.setDefaultAppearance = function () {
	        this.defaultAppearance = new PIXI.Sprite(PIXI.loader.resources["T-RexNormal"].texture);
	        this.defaultAppearance.width = 42;
	        this.defaultAppearance.height = 45;
	        this.defaultAppearance.position.set(30, 90);
	    };
	    Dino.prototype.firstStepAppearance = function () {
	        this.firstStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep1"].texture);
	        this.firstStep.width = 42;
	        this.firstStep.height = 45;
	        this.firstStep.position.set(30, 90);
	        this.firstStep.visible = false;
	    };
	    Dino.prototype.secondStepAppearance = function () {
	        this.secondStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep2"].texture);
	        this.secondStep.width = 42;
	        this.secondStep.height = 45;
	        this.secondStep.position.set(30, 90);
	        this.secondStep.visible = false;
	    };
	    Dino.prototype.setCrashAppearance = function () {
	        this.crashAppearance = new PIXI.Sprite(PIXI.loader.resources["crash"].texture);
	        this.crashAppearance.width = 42;
	        this.crashAppearance.height = 45;
	        this.crashAppearance.position.set(30, 90);
	        this.crashAppearance.visible = false;
	    };
	    Dino.prototype.animateTRex = function () {
	        var _this = this;
	        var i = 0;
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
	        }, 100);
	    };
	    Dino.prototype.jump = function () {
	        clearInterval(this.walkInterval);
	        this.firstStep.visible = false;
	        this.secondStep.visible = false;
	        this.defaultAppearance.visible = true;
	        var _this = this;
	        var i = 0;
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
	    };
	    return Dino;
	}());
	module.exports = Dino;


/***/ }
/******/ ]);