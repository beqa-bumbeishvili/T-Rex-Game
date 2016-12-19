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
	        this.way = new PIXI.Sprite(PIXI.loader.resources["path"].texture);
	        this.way.position.set(0, 130);
	        this.way.width = this.renderer.width;
	        this.dino = new Dino(this.stage);
	        this.dino.showTRex();
	        this.stage.addChild(this.way);
	    }
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
	        this.visual = new PIXI.Sprite(PIXI.loader.resources["T-RexNormal"].texture);
	        this.visual.width = 42;
	        this.visual.height = 45;
	        this.visual.position.set(30, 80);
	    }
	    Dino.prototype.showTRex = function () {
	        this.stage.addChild(this.visual);
	    };
	    return Dino;
	}());
	module.exports = Dino;


/***/ }
/******/ ]);