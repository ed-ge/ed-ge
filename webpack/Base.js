var Base =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/engine/Base.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/engine/Base.js":
/*!****************************!*\
  !*** ./src/engine/Base.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_Behavior_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/Behavior.js */ \"./src/engine/base/Behavior.js\");\n/* harmony import */ var _base_Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/Component.js */ \"./src/engine/base/Component.js\");\n/* harmony import */ var _base_Component_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_base_Component_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _base_GameObject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/GameObject.js */ \"./src/engine/base/GameObject.js\");\n/* harmony import */ var _base_GameObject_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_base_GameObject_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _base_Scene_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/Scene.js */ \"./src/engine/base/Scene.js\");\n/* harmony import */ var _base_Scene_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_base_Scene_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _base_Time_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base/Time.js */ \"./src/engine/base/Time.js\");\n/* harmony import */ var _base_Time_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_base_Time_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _base_Input_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base/Input.js */ \"./src/engine/base/Input.js\");\n/* harmony import */ var _base_Input_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_base_Input_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _base_NamableParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base/NamableParent.js */ \"./src/engine/base/NamableParent.js\");\n/* harmony import */ var _base_NamableParent_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_base_NamableParent_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _base_Point_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base/Point.js */ \"./src/engine/base/Point.js\");\n\n\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  Behavior: _base_Behavior_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  Component: (_base_Component_js__WEBPACK_IMPORTED_MODULE_1___default()),\n  GameObject: (_base_GameObject_js__WEBPACK_IMPORTED_MODULE_2___default()),\n  Scene: (_base_Scene_js__WEBPACK_IMPORTED_MODULE_3___default()),\n  Time: (_base_Time_js__WEBPACK_IMPORTED_MODULE_4___default()),\n  Input: (_base_Input_js__WEBPACK_IMPORTED_MODULE_5___default()),\n  NameableParent: (_base_NamableParent_js__WEBPACK_IMPORTED_MODULE_6___default()),\n  Point: _base_Point_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  \n});\n\n//# sourceURL=webpack://Base/./src/engine/Base.js?");

/***/ }),

/***/ "./src/engine/base/Behavior.js":
/*!*************************************!*\
  !*** ./src/engine/base/Behavior.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component.js */ \"./src/engine/base/Component.js\");\n/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Component_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/**\n * Behaviors are game-specific class that add logic to game objects\n */\nclass Behavior extends _Component_js__WEBPACK_IMPORTED_MODULE_0___default.a {\n\n    /**\n     * Called when the parent game object is instatiated,\n     * either when the scene starts if the game object is\n     * part of the scene definition or in the middle of \n     * the scene when the game object is instantiated.\n     * \n     * This is a great place to setup up your scene or\n     * instantiate other game objects programmatically.\n     * For example, if you have a tile-based game, you \n     * could use the start() method of a controller \n     * behaviors to intantiate all the tiled with a \n     * double for loop.\n     */\n    start() {}\n\n    /**\n     * Called as part of the game loop.\n     * Whenever the game loop fires, all game objects in\n     * the scene recursively call update on all their \n     * behaviors and then on all their child game object\n     * behaviors.\n     */\n    update() {}\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Behavior);\n\n//# sourceURL=webpack://Base/./src/engine/base/Behavior.js?");

/***/ }),

/***/ "./src/engine/base/Component.js":
/*!**************************************!*\
  !*** ./src/engine/base/Component.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (32:14)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|      * you will invariably run into bugs.\\n|      */\\n>     gameObject;\\n| \\n| \");\n\n//# sourceURL=webpack://Base/./src/engine/base/Component.js?");

/***/ }),

/***/ "./src/engine/base/GameObject.js":
/*!***************************************!*\
  !*** ./src/engine/base/GameObject.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (14:5)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|      * The x position of the game object relative to its parent\\n|      */\\n>     x;\\n| \\n|     /**\");\n\n//# sourceURL=webpack://Base/./src/engine/base/GameObject.js?");

/***/ }),

/***/ "./src/engine/base/Input.js":
/*!**********************************!*\
  !*** ./src/engine/base/Input.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (10:16)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|     //Key handling members\\n|     //---------------------------------------------------\\n>     static keys = []; //What is the current state of each key?\\n| \\n|     static down = []; //Did the key go down this frame?\");\n\n//# sourceURL=webpack://Base/./src/engine/base/Input.js?");

/***/ }),

/***/ "./src/engine/base/NamableParent.js":
/*!******************************************!*\
  !*** ./src/engine/base/NamableParent.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (14:13)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|      * An array of children this instance has\\n|      */\\n>     children = [];\\n| \\n|     /**\");\n\n//# sourceURL=webpack://Base/./src/engine/base/NamableParent.js?");

/***/ }),

/***/ "./src/engine/base/Point.js":
/*!**********************************!*\
  !*** ./src/engine/base/Point.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * 2D Point class\n */\n\nclass Point {\n    /**\n     * \n     * @param {Number} x The x location of the point\n     * @param {Number} y The y location of the point\n     */\n    constructor(x = 0, y = 0) {\n        this.x = x;\n        this.y = y;\n    }\n\n    /**\n     * Calculate the Euclidian distance between this point and another point.\n     * \n     * @param {Point} otherPoint The point to which we are calculating a distance\n     */\n    distance(otherPoint = new Point(0, 0)) {\n\n        return Math.sqrt(this.distanceSquared(otherPoint));\n    }\n\n    /**\n     * Since finding the Euclidean distance requires an expensive square root\n     * calculation, we have the option of calculating the squared distance to go\n     * quicker.\n     * \n     * @param {Point} otherPoint The point to which we are calculating the\n     * squared distance\n     */\n    distanceSquared(otherPoint = new Point(0, 0)) {\n        let xDiff = (this.x - otherPoint.x);\n        let yDiff = (this.y - otherPoint.y);\n        return xDiff * xDiff + yDiff * yDiff;\n    }\n\n    /**\n     * Find the pairwise difference to another point.\n     * \n     * @param {Point} otherPoint The point from which we are doing a pairwise\n     * difference. \n     */\n    diff(otherPoint) {\n        return new Point(this.x - otherPoint.x, this.y - otherPoint.y);\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Point);\n\n//# sourceURL=webpack://Base/./src/engine/base/Point.js?");

/***/ }),

/***/ "./src/engine/base/Scene.js":
/*!**********************************!*\
  !*** ./src/engine/base/Scene.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (18:23)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|      * dependencies.\\n|      */\\n>     static gameObjects = [];\\n| \\n|     /**\");\n\n//# sourceURL=webpack://Base/./src/engine/base/Scene.js?");

/***/ }),

/***/ "./src/engine/base/Time.js":
/*!*********************************!*\
  !*** ./src/engine/base/Time.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (6:21)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| \\n| class Time {\\n>     static deltaTime = 0;\\n| }\\n| \");\n\n//# sourceURL=webpack://Base/./src/engine/base/Time.js?");

/***/ })

/******/ });