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
	    .add("one", "app/assets/obstacles/1.png")
	    .add("two", "app/assets/obstacles/2.png")
	    .add("three", "app/assets/obstacles/3.png")
	    .add("path", "app/assets/way/path.png")
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
	    TRexGame.prototype.showObstacles = function () {
	        var _this = this;
	        var i = 0;
	        setInterval(function () {
	            i++;
	            _this.obstacle.x--;
	            /* if (_this.dino.visual.x + _this.dino.visual.width > _this.obstacle.x && _this.dino.visual.x < _this.obstacle.x + _this.obstacle.width)
	                 if (_this.dino.visual.y - _this.dino.height <= _this.obstacle.y)
	                     alert('hit!');*/
	            if (i == 1200) {
	                i = 0;
	            }
	        }, 10);
	    };
	    TRexGame.prototype.animateRoad = function () {
	        var _this = this;
	        var i = 0;
	        setInterval(function () {
	            _this.road.x--;
	            i++;
	            if (i == _this.road.width / 2) {
	                _this.road.x = 0;
	                i = 0;
	            }
	        }, 10);
	    };
	    TRexGame.prototype.jumpEvent = function () {
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
	        this.firstStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep1"].texture);
	        this.firstStep.width = 42;
	        this.firstStep.height = 45;
	        this.firstStep.position.set(30, 80);
	        this.firstStep.visible = false;
	        this.secondStep = new PIXI.Sprite(PIXI.loader.resources["T-RexStep2"].texture);
	        this.secondStep.width = 42;
	        this.secondStep.height = 45;
	        this.secondStep.position.set(30, 80);
	        this.secondStep.visible = false;
	        this.jumpInterval = false;
	        this.stage.addChild(this.defaultAppearance);
	        this.stage.addChild(this.firstStep);
	        this.stage.addChild(this.secondStep);
	    }
	    Dino.prototype.setDefaultAppearance = function () {
	        this.defaultAppearance = new PIXI.Sprite(PIXI.loader.resources["T-RexNormal"].texture);
	        this.defaultAppearance.width = 42;
	        this.defaultAppearance.height = 45;
	        this.defaultAppearance.position.set(30, 80);
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
	            if (_this.defaultAppearance.y == 80) {
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