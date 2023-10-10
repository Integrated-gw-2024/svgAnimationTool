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

/***/ "./source/Element.js":
/*!***************************!*\
  !*** ./source/Element.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Element: () => (/* binding */ Element)\n/* harmony export */ });\n\nclass Element{\n    parentElement;\n    tagDetector;\n    name;\n    DOMType;\n    element;\n\n    constructor(ParentElement, TagDetector, Name, DOMType){\n        if(typeof ParentElement == \"string\"){this.parentElement = document.getElementById(ParentElement);}\n        else{this.parentElement = ParentElement;}\n        this.tagDetector = TagDetector;\n        this.name = Name;\n        this.DOMType = DOMType;\n        this.createElement();\n    }\n\n    createElement(){\n        console.log(this.name + \" / \" + this.parentElement);\n        this.element = document.createElement(this.DOMType);//box要素を作る\n        if(this.DOMType == \"input\"){this.element.type = 'file';}\n        this.element.setAttribute(this.tagDetector, this.name);//idをつける\n        this.parentElement.appendChild(this.element);\n    }\n\n    getDOMElement(){\n        return this.element;\n    }\n}\n\n\n//# sourceURL=webpack:///./source/Element.js?");

/***/ }),

/***/ "./source/FileList.js":
/*!****************************!*\
  !*** ./source/FileList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FileDivManager: () => (/* binding */ FileDivManager),\n/* harmony export */   FileList: () => (/* binding */ FileList),\n/* harmony export */   FileStyle: () => (/* binding */ FileStyle),\n/* harmony export */   SVGfile: () => (/* binding */ SVGfile)\n/* harmony export */ });\n/* harmony import */ var _svgLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svgLoader */ \"./source/svgLoader.js\");\n/* harmony import */ var _fileUploader_Uploader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileUploader/Uploader */ \"./source/fileUploader/Uploader.js\");\n/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Element */ \"./source/Element.js\");\n//svgFileListは画面右のあのリストのことを言っているよ\n//fileはsvgFileとdivの二つで構成されているよ\n//divにはスタイルをつける用のクラスがあるよ\n\n\n\n\n\n\n\n\n\nclass FileList {\n    files = [];\n    parentElement;\n    fileBox;\n    uploadButtonBox;\n    analyzer;\n    style;\n\n    constructor(ParentElement) {\n        this.parentElement = ParentElement;\n\n        this.style = new FileStyle();\n\n        //wrapperを作る\n        this.fileBox = new _Element__WEBPACK_IMPORTED_MODULE_2__.Element(this.parentElement, \"id\", \"fileBox\", \"div\");\n        this.uploadButtonBox = new _Element__WEBPACK_IMPORTED_MODULE_2__.Element(this.parentElement, \"id\", \"uploadButtonBox\", \"div\");\n        this.uploader = new _fileUploader_Uploader__WEBPACK_IMPORTED_MODULE_1__.Uploader(\"uploadButtonBox\", \"uploader\");//inputElementを作成する\n        this.inputButton = new _svgLoader__WEBPACK_IMPORTED_MODULE_0__.SvgButton(\"#uploader_inputElement\");//inputElementのイベントリスナーを生成\n\n        this.inputButton.addEventListener('svgLoaded', (event) => {\n            this.analyzer = new _svgLoader__WEBPACK_IMPORTED_MODULE_0__.SvgCircleAnalyzer(event);\n            //ここでfileListにデータを保存する\n            this.files.push({\n                file: new SVGfile(this.analyzer.getArray()),\n                div: new FileDivManager(this.fileBox.getDOMElement())\n            });\n        });\n    }\n\n    getFilesLength() {\n        return this.files.length;\n    }\n    getSvgData(i) {\n        return this.files[i].getArray();\n    }\n}\n\n\nclass SVGfile {\n    svgArray;\n\n    constructor(svgArray) {\n        this.svgArray = svgArray;\n    }\n\n    getArray() {\n        return this.svgArray;\n    }\n}\n\nclass FileDivManager {\n    divElement;\n    pElement;\n    divStyle;\n\n    constructor(ParentElement) {\n        this.parentElement = ParentElement;\n        this.divElement = new _Element__WEBPACK_IMPORTED_MODULE_2__.Element(this.parentElement, \"class\", \"file_divElement\", \"div\")\n        this.pElement = new _Element__WEBPACK_IMPORTED_MODULE_2__.Element(this.divElement.getDOMElement(), \"class\", \"file_pElement\", \"p\");\n        this.pElement.getDOMElement().textContent = 'アップロード済み!';\n    }\n}\n\nclass FileStyle {\n    targetElement;\n    style;\n\n    constructor() {\n        // this.tags = Tags;\n        //スタイル エレメントを作成\n        this.div_divStyle = document.createElement(\"style\");\n        this.div_pStyle = document.createElement(\"style\");\n        this.uploadButton_buttonStyle = document.createElement(\"style\");\n        this.uploadButton_buttonStyle_hover = document.createElement(\"style\");\n        this.uploadButton_inputStyle = document.createElement(\"style\");\n        this.uploadButton_pStyle = document.createElement(\"style\");\n        this.uploadButton_pStyle_hover = document.createElement(\"style\");\n        //スタイルをヘッダに入れる\n        document.head.appendChild(this.div_divStyle);\n        document.head.appendChild(this.div_pStyle);\n        document.head.appendChild(this.uploadButton_buttonStyle);\n        document.head.appendChild(this.uploadButton_inputStyle);\n        document.head.appendChild(this.uploadButton_pStyle);\n        document.head.appendChild(this.uploadButton_buttonStyle_hover);\n        document.head.appendChild(this.uploadButton_pStyle_hover);\n        //スタイルシートの設定\n        this.div_divStyle.sheet.insertRule(`\n        .file_divElement {\n                    margin:5px;\n                    width: 200px;\n                    height: 30px;\n                    background-color: \n                    #555555;border-radius: \n                    5px;box-shadow: 0px 0px 7px #909090; \n                    display: flex;\n                    flex-direction: column;\n                    justify-content: center;\n                    align-items: center;\n                }`, 0);\n        this.div_pStyle.sheet.insertRule(`\n                .file_pElement {\n                    color:#FFFFFF;\n                    font-size:15px;\n                }`, 0);\n        this.uploadButton_buttonStyle.sheet.insertRule(`\n        #uploader_buttonElement {\n        margin:5px;\n        width: 200px;\n        height: 30px;\n        background-color: \n        #FFFFFF;\n        border-radius: \n        5px;box-shadow: 0px 0px 7px #909090; \n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        }`, 0);\n        this.uploadButton_inputStyle.sheet.insertRule(`\n        #uploader_inputElement {\n        display: none;\n        }`, 0);\n        this.uploadButton_pStyle.sheet.insertRule(`\n        #uploader_pElement {\n        color: #000000;\n        font-size:15px;\n                }`, 0);\n        this.uploadButton_buttonStyle_hover.sheet.insertRule(`\n        #uploader_buttonElement:hover{\n        background-color: \n        #555555;\n        }`, 0);\n        this.uploadButton_pStyle_hover.sheet.insertRule(`\n        #uploader_buttonElement:hover #uploader_pElement{\n        color: #FFFFFF;\n        font-size:15px;\n        }`, 0);\n    }\n}\n\n//# sourceURL=webpack:///./source/FileList.js?");

/***/ }),

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

/***/ "./source/fileUploader/Uploader.js":
/*!*****************************************!*\
  !*** ./source/fileUploader/Uploader.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Uploader: () => (/* binding */ Uploader)\n/* harmony export */ });\n/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Element */ \"./source/Element.js\");\n\n\nclass Uploader {\n    //ファイルをアップロードする関数\n    parentElement;\n    inputElementId;\n    inputElement;\n    buttonElement;\n    pElement;\n\n    constructor(ParentElementId, IdName) {\n        this.parentElement_id = ParentElementId;\n        this.idName = IdName;\n\n        //要素を作る\n        this.buttonElement = new _Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.parentElement_id, \"id\",this.idName + \"_buttonElement\", \"button\");\n        this.inputElement = new _Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.buttonElement.getDOMElement(), \"id\", this.idName +\"_inputElement\", \"input\");\n        this.pElement = new _Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.buttonElement.getDOMElement(), \"id\", this.idName +\"_pElement\", \"p\");\n        this.pElement.getDOMElement().textContent = '+';\n\n        //wrapperであるbutton要素がクリックされた時に、input要素のボタンを発火させている\n        this.buttonElement.getDOMElement().addEventListener(\"click\", () => {\n                this.inputElement.getDOMElement().click();\n        });\n    }\n\n    getDOMElement(TargetElement){\n        if(TargetElement == \"button\"){return this.buttonElement.getDOMElement();}\n        else if(TargetElement == \"input\"){return this.inputElement.getDOMElement();}\n        }\n}\n\n//# sourceURL=webpack:///./source/fileUploader/Uploader.js?");

/***/ }),

/***/ "./source/main.js":
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _FileList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FileList */ \"./source/FileList.js\");\n\n\n\nlet fileList;\nwindow.onload = createUploadButton;\n\nfunction createUploadButton() {\n    fileList = new _FileList__WEBPACK_IMPORTED_MODULE_0__.FileList(\"fileList\");\n}\n\n\n\n//# sourceURL=webpack:///./source/main.js?");

/***/ }),

/***/ "./source/svgLoader.js":
/*!*****************************!*\
  !*** ./source/svgLoader.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SvgButton: () => (/* binding */ SvgButton),\n/* harmony export */   SvgCircleAnalyzer: () => (/* binding */ SvgCircleAnalyzer),\n/* harmony export */   SvgLoader: () => (/* binding */ SvgLoader)\n/* harmony export */ });\n/* harmony import */ var _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListener/eventListener */ \"./source/eventListener/eventListener.js\");\n\r\n\r\n/**\r\n   * svgElementを読み込むクラス。\r\n   * @param {HTMLInputElement} TargetFile -inputから受け取ったデータを入力(event.target.files[0]);\r\n   */\r\nclass SvgLoader {\r\n  rawData;\r\n  url;\r\n  svgElements;\r\n\r\n  constructor(TargetFile = null) {\r\n    this.rawData = TargetFile;\r\n    this.url = URL.createObjectURL(this.rawData);\r\n\r\n    this.loadSVG();\r\n  }\r\n\r\n  loadSVG() {\r\n    if(this.rawData == null) {\r\n      throw new Error('rawDataの値が入力されていません。')\r\n    }\r\n\r\n    this.svgElements = new Promise(async (resolve, reject) => {\r\n      try {\r\n        const response = await fetch(this.url);\r\n        const data = await response.text();\r\n        const parser = new DOMParser(); // DOMParserを作成\r\n        const svgDoc = parser.parseFromString(data, 'image/svg+xml'); // SVGデータを解析\r\n        resolve(svgDoc.querySelector('svg'));\r\n      } catch (error) {\r\n        console.error(error);\r\n        reject(error);\r\n      }\r\n    })\r\n  }\r\n}\r\n\r\n/**\r\n   * inputタグを使用可能な状態にします。\r\n   * @param {HTMLInputElement | string} selector -inputタグを直接渡すか、id名を書いてください。\r\n   */\r\nclass SvgButton {\r\n  inputElement;\r\n\r\n  #svgLoader;\r\n  svgElements;\r\n\r\n  #eventListener;\r\n\r\n  constructor(selector) {\r\n    this.#eventListener = new _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_0__.EventListener();\r\n\r\n    console.log(selector);\r\n    if (typeof selector === 'string') {\r\n      this.inputElement = document.querySelector(selector);\r\n    } else {\r\n      this.inputElement = selector;\r\n    }\r\n\r\n    this.inputElement.addEventListener('change', async (event) => {\r\n      console.log(\"アップロード成功\");\r\n      this.#svgLoader = new SvgLoader(event.target.files[0]);\r\n      event.target.value = null;\r\n      this.svgElements = new Promise(async (resolve, reject) => {\r\n        \r\n        try {\r\n          const result = await this.#svgLoader.svgElements;\r\n          resolve(result);\r\n          this.#eventListener.dispatch('svgLoaded', result);\r\n        } catch (error) {\r\n          reject(error);\r\n        }\r\n      })\r\n    })\r\n  }\r\n\r\n  /**\r\n   * svgElementを読み込むクラス。\r\n   * @param {string | svgLoaded} name -現状svgLoaded以外にイベントはありません。\r\n   * @param {(svgElements) =>} callback -任意のコールバック関数を入力してください。()内にはsvgElementsが渡されます。\r\n   */\r\n  addEventListener(name, callback) {\r\n    if(name != 'svgLoaded') throw new Error('該当するイベント名はありません。');\r\n    this.#eventListener.add(name, callback, this);\r\n  }\r\n}\r\n\r\n/**\r\n   * svgElementsから位置情報や大きさなどを取り出すクラス。\r\n   * @param {svgElements} svgElements -svgLoaderクラスで取り出したsvgElementsを入れてください。\r\n   * @param {center | left} svgElements -座標の読み込み基準を決められます。\r\n   */\r\nclass SvgCircleAnalyzer {\r\n  svgElements;\r\n  svgCircleElements;\r\n  svgViewBoxSize;\r\n\r\n  circles;\r\n\r\n  constructor(svgElements, mode = 'center') {\r\n    if (mode != 'center' && mode != 'left') {\r\n      throw new Error('ReferenceModeに渡された値が不正です。centerもしくはleftを渡してください');\r\n    }\r\n\r\n    this.svgElements = svgElements\r\n\r\n    const viewBoxValues = this.svgElements.getAttribute('viewBox').split(' ').map((param) => +param);\r\n    this.svgViewSize = {\r\n      width: viewBoxValues[2],\r\n      height: viewBoxValues[3],\r\n    }\r\n\r\n    this.circles = [];\r\n    const circleElements = this.svgElements.querySelectorAll('circle');\r\n    for(const circleElement of circleElements) {\r\n      let circle = {\r\n        position: {\r\n          x: null,\r\n          y: null,\r\n        },\r\n        radius: null,\r\n        fill: null,\r\n        strokeColor: null,\r\n        strokeWeight: null,\r\n      }\r\n\r\n      switch (mode) {\r\n        case 'left':\r\n          circle.position.x = parseFloat(circleElement.getAttribute('cx'));\r\n          circle.position.y = parseFloat(circleElement.getAttribute('cy'));\r\n          break;\r\n        case 'center':\r\n          circle.position.x = parseFloat(circleElement.getAttribute('cx') - this.svgViewSize.width / 2);\r\n          circle.position.y = parseFloat(circleElement.getAttribute('cy') - this.svgViewSize.height / 2);\r\n          break;\r\n      }\r\n\r\n      circle.radius = parseFloat(circleElement.getAttribute('r'));\r\n      circle.fill = circleElement.getAttribute('fill'); //数値に直す必要がないので注意\r\n      circle.strokeColor = circleElement.getAttribute('stroke');\r\n      circle.strokeWeight = parseFloat(circleElement.getAttribute('stroke-width'));\r\n\r\n      this.circles.push(circle);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * 読み込んだcirclesの配列の長さを取得する。\r\n   */\r\n  getLength() {\r\n    return this.circles.length;\r\n  }\r\n\r\n  /**\r\n   * 読み込んだsvgファイルのキャンパスサイズを取得する。\r\n   */\r\n  getViewSize() {\r\n      return this.svgViewSize;\r\n  }\r\n\r\n  /**\r\n   * 特定のcircleの情報だけを取得する。\r\n   */\r\n  getCircleElement(i) {\r\n      return this.circles[i];\r\n  }\r\n\r\n  /**\r\n   * 読み込んだsvgの情報を配列として書き出すことができる。\r\n   */\r\n  getArray() {\r\n      return this.circles;\r\n  }\r\n}\n\n//# sourceURL=webpack:///./source/svgLoader.js?");

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