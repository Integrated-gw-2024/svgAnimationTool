/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/eventListener/eventListener.js":
/*!***********************************************!*\
  !*** ./source/eventListener/eventListener.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventListener: () => (/* binding */ EventListener)\n/* harmony export */ });\n/* harmony import */ var _eventRegistry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventRegistry */ \"./source/eventListener/eventRegistry.js\");\n\n\nclass EventListener {\n  callbacks;\n\n  constructor() {\n    this.callbacks = new Map();\n  }\n\n  add(name, callback, scope) {\n    if (!this.callbacks.has(name)) {\n      this.callbacks.set(name, []);\n    }\n    if (callback === undefined) return;\n    let event;\n    if (scope === undefined) {\n      event = new _eventRegistry__WEBPACK_IMPORTED_MODULE_0__.EventRegistry(this, name, callback, callback);\n    } else {\n      event = new _eventRegistry__WEBPACK_IMPORTED_MODULE_0__.EventRegistry(this, name, callback, scope);\n    }\n    this.callbacks.get(name)?.push(event);\n  }\n\n  dispatch(name, argA, argB, argC, argD, argE, argF) {\n    if (!this.callbacks.has(name)) {\n      throw new Error(`'${name}'イベントは登録されていません。`);\n    }\n    for (const event of this.callbacks.get(name)) {\n      event.callback.call(event.scope, argA, argB, argC, argD, argE, argF);\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./source/eventListener/eventListener.js?");

/***/ }),

/***/ "./source/eventListener/eventRegistry.js":
/*!***********************************************!*\
  !*** ./source/eventListener/eventRegistry.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventRegistry: () => (/* binding */ EventRegistry)\n/* harmony export */ });\nclass EventRegistry {\n  listener;\n  name;\n  callback;\n  scope;\n  constructor(listener, name, callback, scope) {\n    this.listener = listener;\n    this.name = name;\n    this.callback = callback;\n    this.scope = scope;\n  }\n}\n\n\n//# sourceURL=webpack:///./source/eventListener/eventRegistry.js?");

/***/ }),

/***/ "./source/main.js":
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _svgLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svgLoader */ \"./source/svgLoader.js\");\n\n\n\nlet inputButton;\n\ndocument.addEventListener(\"DOMContentLoaded\", setup);\n\nfunction setup() {\n  inputButton = new _svgLoader__WEBPACK_IMPORTED_MODULE_0__.SvgButton(\"#fileInput\"); //document.querySelector(\"#fileInput\")でも可\n  inputButton.addEventListener('change', () => {\n    console.log('アップロード成功');\n  })\n\n  inputButton.addEventListener('svgLoaded', (event) => {\n    //console.log(event);\n    const apple = new _svgLoader__WEBPACK_IMPORTED_MODULE_0__.SvgCircleAnalyzer(event);\n    console.log('svgLoaded');\n    console.log(apple.circles[0]);\n  })\n}\n\n//# sourceURL=webpack:///./source/main.js?");

/***/ }),

/***/ "./source/svgLoader.js":
/*!*****************************!*\
  !*** ./source/svgLoader.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SvgButton: () => (/* binding */ SvgButton),\n/* harmony export */   SvgCircleAnalyzer: () => (/* binding */ SvgCircleAnalyzer),\n/* harmony export */   SvgLoader: () => (/* binding */ SvgLoader)\n/* harmony export */ });\n/* harmony import */ var _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListener/eventListener */ \"./source/eventListener/eventListener.js\");\n\r\n\r\n/**\r\n   * svgElementを読み込むクラス。\r\n   * @param {HTMLInputElement} TargetFile -inputから受け取ったデータを入力(event.target.files[0]);\r\n   */\r\nclass SvgLoader {\r\n  rawData;\r\n  url;\r\n  svgElements;\r\n\r\n  constructor(TargetFile = null) {\r\n    this.rawData = TargetFile;\r\n    this.url = URL.createObjectURL(this.rawData);\r\n\r\n    this.loadSVG();\r\n  }\r\n\r\n  loadSVG() {\r\n    if(this.rawData == null) {\r\n      throw new Error('rawDataの値が入力されていません。')\r\n    }\r\n\r\n    this.svgElements = new Promise(async (resolve, reject) => {\r\n      try {\r\n        const response = await fetch(this.url);\r\n        const data = await response.text();\r\n        const parser = new DOMParser(); // DOMParserを作成\r\n        const svgDoc = parser.parseFromString(data, 'image/svg+xml'); // SVGデータを解析\r\n        resolve(svgDoc.querySelector('svg'));\r\n      } catch (error) {\r\n        console.error(error);\r\n        reject(error);\r\n      }\r\n    })\r\n  }\r\n}\r\n\r\n/**\r\n   * inputタグを使用可能な状態にします。\r\n   * @param {HTMLInputElement | string} selector -inputタグを直接渡すか、id名を書いてください。\r\n   */\r\nclass SvgButton {\r\n  inputElement;\r\n\r\n  #svgLoader;\r\n  svgElements;\r\n\r\n  #eventListener;\r\n\r\n  constructor(selector) {\r\n    this.#eventListener = new _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_0__.EventListener();\r\n    this.#eventListener.add('change', () => {}, this);\r\n    this.#eventListener.add('svgLoaded', () => {}, this);\r\n\r\n    if (typeof selector === 'string') {\r\n      this.inputElement = document.querySelector(selector);\r\n    } else {\r\n      this.inputElement = selector;\r\n    }\r\n\r\n    this.inputElement.addEventListener('change', async (event) => {\r\n      this.#eventListener.dispatch('change');\r\n\r\n      this.#svgLoader = new SvgLoader(event.target.files[0]);\r\n      event.target.filse = null;\r\n\r\n      this.svgElements = new Promise(async (resolve, reject) => {\r\n        try {\r\n          const result = await this.#svgLoader.svgElements;\r\n          resolve(result);\r\n          this.#eventListener.dispatch('svgLoaded', result);\r\n        } catch (error) {\r\n          reject(error);\r\n        }\r\n      })\r\n    })\r\n  }\r\n\r\n  /**\r\n   * svgElementを読み込むクラス。\r\n   * @param {string | svgLoaded} name -現状svgLoaded以外にイベントはありません。\r\n   * @param {(svgElements) =>} callback -任意のコールバック関数を入力してください。()内にはsvgElementsが渡されます。\r\n   */\r\n  addEventListener(name, callback) {\r\n    if(name != 'svgLoaded' && name != 'change') throw new Error('該当するイベント名はありません。');\r\n    this.#eventListener.add(name, callback, this);\r\n  }\r\n}\r\n\r\n/**\r\n   * svgElementsから位置情報や大きさなどを取り出すクラス。\r\n   * @param {svgElements} svgElements -svgLoaderクラスで取り出したsvgElementsを入れてください。\r\n   * @param {center | left} svgElements -座標の読み込み基準を決められます。\r\n   */\r\nclass SvgCircleAnalyzer {\r\n  svgElements;\r\n  svgCircleElements;\r\n  svgViewBoxSize;\r\n\r\n  circles;\r\n\r\n  constructor(svgElements, mode = 'center') {\r\n    if (mode != 'center' && mode != 'left') {\r\n      throw new Error('ReferenceModeに渡された値が不正です。centerもしくはleftを渡してください');\r\n    }\r\n\r\n    this.svgElements = svgElements\r\n\r\n    const viewBoxValues = this.svgElements.getAttribute('viewBox').split(' ').map((param) => +param);\r\n    this.svgViewSize = {\r\n      width: viewBoxValues[2],\r\n      height: viewBoxValues[3],\r\n    }\r\n\r\n    this.circles = [];\r\n    const circleElements = this.svgElements.querySelectorAll('circle');\r\n    for(const circleElement of circleElements) {\r\n      let circle = {\r\n        position: {\r\n          x: null,\r\n          y: null,\r\n        },\r\n        radius: null,\r\n        fill: null,\r\n        strokeColor: null,\r\n        strokeWeight: null,\r\n      }\r\n\r\n      switch (mode) {\r\n        case 'left':\r\n          circle.position.x = parseFloat(circleElement.getAttribute('cx'));\r\n          circle.position.y = parseFloat(circleElement.getAttribute('cy'));\r\n          break;\r\n        case 'center':\r\n          circle.position.x = parseFloat(circleElement.getAttribute('cx') - this.svgViewSize.width / 2);\r\n          circle.position.y = parseFloat(circleElement.getAttribute('cy') - this.svgViewSize.height / 2);\r\n          break;\r\n      }\r\n\r\n      circle.radius = parseFloat(circleElement.getAttribute('r'));\r\n      circle.fill = circleElement.getAttribute('fill'); //数値に直す必要がないので注意\r\n      circle.strokeColor = circleElement.getAttribute('stroke');\r\n      circle.strokeWeight = parseFloat(circleElement.getAttribute('stroke-width'));\r\n\r\n      this.circles.push(circle);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * 読み込んだcirclesの配列の長さを取得する。\r\n   */\r\n  getLength() {\r\n    return this.circles.length;\r\n  }\r\n\r\n  /**\r\n   * 読み込んだsvgファイルのキャンパスサイズを取得する。\r\n   */\r\n  getViewSize() {\r\n      return this.svgViewSize;\r\n  }\r\n\r\n  /**\r\n   * 特定のcircleの情報だけを取得する。\r\n   */\r\n  getCircleElement(i) {\r\n      return this.circles[i];\r\n  }\r\n\r\n  /**\r\n   * 読み込んだsvgの情報を配列として書き出すことができる。\r\n   */\r\n  getArray() {\r\n      return this.circles;\r\n  }\r\n}\n\n//# sourceURL=webpack:///./source/svgLoader.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./source/main.js");
/******/ 	
/******/ })()
;