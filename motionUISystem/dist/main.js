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

/***/ "./source/ControlManager.js":
/*!**********************************!*\
  !*** ./source/ControlManager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ControlManager: () => (/* binding */ ControlManager)\n/* harmony export */ });\n/* harmony import */ var _fileList_FileList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fileList/FileList */ \"./source/fileList/FileList.js\");\n/* harmony import */ var _timeline_Timeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeline/Timeline */ \"./source/timeline/Timeline.js\");\n\n\n\nclass ControlManager {\n    fileList;\n    timeline;\n\n    constructor() {\n        this.timeline = new _timeline_Timeline__WEBPACK_IMPORTED_MODULE_1__.Timeline(\"timeline\");\n        this.fileList = new _fileList_FileList__WEBPACK_IMPORTED_MODULE_0__.FileList(\"fileList\");\n\n        //イベントリスナー\n        this.timeline.event.add(\"motionObjectChanged\", () => {\n            //これはバーの時間を変更し終わった時に発行される\n            console.log(\"変更されましたよ\");\n        });\n        this.timeline.event.add(\"motionObjectClicked\", () => {\n            //これはバーをクリックして選択した瞬間に発行される\n            console.log(\"今は \" + this.timeline.getSelectedObjectNumber() + \" 番目motionObjectを選択中だよ\");\n        })\n\n        //これでmotionObjectを作れるよ。timeline.motionObjectsの中に配列でpushされる\n        this.timeline.pushMotionObject();\n        this.timeline.pushMotionObject();\n        this.timeline.pushMotionObject();\n        //ゲッター\n        // console.log(timeline.getSelectedObjectNumber());\n        //これは今どのバーが選択されているかを取り出せるintで帰ってくるよ\n        // console.log(timeline.getMotionObjectFrames(0));\n        //これは引数で指定したmotionObject（バー）のstartFrameとendFrameとdurationがframe変数にまとまって帰ってくる\n        //取り出す時はframe.startFrameみたいな感じで取り出せる\n\n        //セッター\n        //timeline.setMotionType(\"MotionType\");\n        //stringで入れると、現在選択しているmotionObjectの動きの表示を変更できるよ\n        //setMotionObjectFrames(MotionObjectNum, StartFrame, EndFrame);\n        //指定したmotionObjectの動きのframeパラメーターを変更できる。\n    }\n}\n\n//# sourceURL=webpack:///./source/ControlManager.js?");

/***/ }),

/***/ "./source/MotionData.js":
/*!******************************!*\
  !*** ./source/MotionData.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MotionData: () => (/* binding */ MotionData)\n/* harmony export */ });\n//モーションの本体で、ここにデータが詰まっている\n\nclass MotionData {\n    name;\n    startSvgData;\n    endSvgData;\n    startFrame;\n    endFrame;\n    duration;\n    motionType;\n    motionPARAMS = {};\n\n    constructor(Name, StartSvgData, EndSvgData, StartFrame, EndFrame, MotionType) {\n        //初期化\n        this.name = Name;\n        this.startSvgData = StartSvgData;\n        this.endSvgData = EndSvgData;\n        this.startFrame = StartFrame;\n        this.endFrame = EndFrame;\n        this.motionType = MotionType;\n        this.setInitMotionPARAMS();\n    }\n\n    setInitMotionPARAMS() {\n        this.motionPARAMS = {\n            randomWalk_Range: 0,\n        }\n    }\n    get motionPARAMS(){\n        return this.motionPARAMS;\n    }\n    get data(){\n        let data = {\n            name: this.name,\n            startSvgData: this.startSvgData,\n            endSvgData: this.endSvgData,\n            startFrame: this.startFrame,\n            endFrame: this.endFrame,\n            motionType: this.motionType,\n            motionPARAMS: this.motionPARAMS,\n        }\n        return data;\n    }\n\n    set data(MotionArray) {\n        this.startFrame = MotionArray.startFrame;\n        this.endFrame = MotionArray.endFrame;\n        this.motionType = MotionArray.startSvgData;\n        console.log(\"新しい値にmotionDataを更新したよ\");\n    }\n}\n\n//# sourceURL=webpack:///./source/MotionData.js?");

/***/ }),

/***/ "./source/MotionManager.js":
/*!*********************************!*\
  !*** ./source/MotionManager.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MotionManager: () => (/* binding */ MotionManager)\n/* harmony export */ });\n/* harmony import */ var _MotionData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MotionData */ \"./source/MotionData.js\");\n/* harmony import */ var _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventListener/eventListener */ \"./source/eventListener/eventListener.js\");\n\n\n\nclass MotionManager{\n    motionData = [];\n\n    constructor(){\n        //イベントリスナーを設定\n        this.event = new _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_1__.EventListener();\n        this.event.add(\"dataUpdated\");\n        this.event.add(\"motionAdded\");\n\n        this.addMotionData(\"test\", \"data1\", \"data2\", 0,10,\"testMotion\");\n    }\n\n    //motionDataを追加する\n    addMotionData(Name, StartSvgData, endSvgData, StartFrame, EndFrame, MotionType){\n        this.motionData.push(new _MotionData__WEBPACK_IMPORTED_MODULE_0__.MotionData(Name, StartSvgData, endSvgData, StartFrame, EndFrame, MotionType));\n        this.event.dispatch(\"motionAdded\");\n    }\n\n    //motionDataを更新する\n    updateMotionData(MotionNum, MotionArray){\n        this.motionData[MotionNum].data = MotionArray;\n        this.event.dispatch(\"dataUpdated\");\n    }\n\n    //motionDataを取得する\n    getMotionData(MotionNum){\n        return this.motionData[MotionNum].data;\n    }\n}\n\n//# sourceURL=webpack:///./source/MotionManager.js?");

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

/***/ "./source/fileList/FileList.js":
/*!*************************************!*\
  !*** ./source/fileList/FileList.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FileList: () => (/* binding */ FileList)\n/* harmony export */ });\n/* harmony import */ var _svgLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svgLoader */ \"./source/fileList/svgLoader.js\");\n/* harmony import */ var _fileUploader_Uploader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileUploader/Uploader */ \"./source/fileList/fileUploader/Uploader.js\");\n/* harmony import */ var _utility_Element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utility/Element */ \"./source/utility/Element.js\");\n/* harmony import */ var _file_SVGFile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./file/SVGFile */ \"./source/fileList/file/SVGFile.js\");\n/* harmony import */ var _file_FileDivElements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./file/FileDivElements */ \"./source/fileList/file/FileDivElements.js\");\n/* harmony import */ var _file_FilesStyle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./file/FilesStyle */ \"./source/fileList/file/FilesStyle.js\");\n/* harmony import */ var _fileUploader_UploaderStyle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fileUploader/UploaderStyle */ \"./source/fileList/fileUploader/UploaderStyle.js\");\n//svgFileListは画面右のあのリストのことを言っているよ\n//fileはsvgFileとdivの二つで構成されているよ\n//divにはスタイルをつける用のクラスがあるよ\n\n\n\n\n\n\n\n\n\n\n\n\nclass FileList {\n    files = [];\n    parentElement;\n    fileBox;\n    uploadButtonBox;\n    analyzer;\n    style;\n\n    constructor(ParentElement) {\n        this.parentElement = ParentElement;\n\n        this.style = new _file_FilesStyle__WEBPACK_IMPORTED_MODULE_5__.FilesStyle();\n        this.style2 = new _fileUploader_UploaderStyle__WEBPACK_IMPORTED_MODULE_6__.UploaderStyle();\n\n        //wrapperを作る\n        this.fileBox = new _utility_Element__WEBPACK_IMPORTED_MODULE_2__.Element(this.parentElement, \"id\", \"fileBox\", \"div\");\n        this.uploadButtonBox = new _utility_Element__WEBPACK_IMPORTED_MODULE_2__.Element(this.parentElement, \"id\", \"uploadButtonBox\", \"div\");\n        this.uploader = new _fileUploader_Uploader__WEBPACK_IMPORTED_MODULE_1__.Uploader(\"uploadButtonBox\", \"uploader\");//inputElementを作成する\n        this.inputButton = new _svgLoader__WEBPACK_IMPORTED_MODULE_0__.SvgButton(\"#uploader_inputElement\");//inputElementのイベントリスナーを生成\n\n        this.inputButton.addEventListener('svgLoaded', (event) => {\n            this.analyzer = new _svgLoader__WEBPACK_IMPORTED_MODULE_0__.SvgCircleAnalyzer(event);\n            //ここでfileListにデータを保存する\n            let fileName = this.inputButton.svgLoader.rawData.name;\n            this.files.push({\n                svgDate: new _file_SVGFile__WEBPACK_IMPORTED_MODULE_3__.SVGfile(this.analyzer.getArray()),\n                div: new _file_FileDivElements__WEBPACK_IMPORTED_MODULE_4__.FileDivElements(this.fileBox.getDOMElement(), fileName)\n            });\n        });\n    }\n\n    getFilesLength() {\n        return this.files.length;\n    }\n    getSvgData(i) {\n        return this.files[i].svgData.getArray();\n    }\n}\n\n\n\n//# sourceURL=webpack:///./source/fileList/FileList.js?");

/***/ }),

/***/ "./source/fileList/file/FileDivElements.js":
/*!*************************************************!*\
  !*** ./source/fileList/file/FileDivElements.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FileDivElements: () => (/* binding */ FileDivElements)\n/* harmony export */ });\n/* harmony import */ var _utility_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/Element */ \"./source/utility/Element.js\");\n\n\nclass FileDivElements {\n    divElement;\n    pElement;\n    divStyle;\n\n    constructor(ParentElement, Text) {\n        this.parentElement = ParentElement;\n        this.text = Text;\n        this.divElement = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.parentElement, \"class\", \"file_divElement\", \"div\")\n        this.pElement = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.divElement.getDOMElement(), \"class\", \"file_pElement\", \"p\");\n        this.pElement.getDOMElement().textContent = this.text;\n    }\n}\n\n//# sourceURL=webpack:///./source/fileList/file/FileDivElements.js?");

/***/ }),

/***/ "./source/fileList/file/FilesStyle.js":
/*!********************************************!*\
  !*** ./source/fileList/file/FilesStyle.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FilesStyle: () => (/* binding */ FilesStyle)\n/* harmony export */ });\nclass FilesStyle {\n    constructor() {\n        // this.tags = Tags;\n        //スタイル エレメントを作成\n        this.div_divStyle = document.createElement(\"style\");\n        this.div_pStyle = document.createElement(\"style\");\n        //スタイルをヘッダに入れる\n        document.head.appendChild(this.div_divStyle);\n        document.head.appendChild(this.div_pStyle);\n        //スタイルシートの設定\n        this.div_divStyle.sheet.insertRule(`\n        .file_divElement {\n                    margin:5px;\n                    width: 200px;\n                    height: 30px;\n                    background-color: \n                    #555555;border-radius: \n                    5px;box-shadow: 0px 0px 7px #909090; \n                    display: flex;\n                    flex-direction: column;\n                    justify-content: center;\n                    align-items: left;\n                }`, 0);\n        this.div_pStyle.sheet.insertRule(`\n                .file_pElement {\n                    color:#FFFFFF;\n                    margin-left: 10px;\n                    font-size:15px;\n                }`, 0);\n    }\n}\n\n//# sourceURL=webpack:///./source/fileList/file/FilesStyle.js?");

/***/ }),

/***/ "./source/fileList/file/SVGFile.js":
/*!*****************************************!*\
  !*** ./source/fileList/file/SVGFile.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SVGfile: () => (/* binding */ SVGfile)\n/* harmony export */ });\nclass SVGfile {\n    svgArray;\n\n    constructor(svgArray) {\n        this.svgArray = svgArray;\n    }\n\n    getArray() {\n        return this.svgArray;\n    }\n}\n\n\n//# sourceURL=webpack:///./source/fileList/file/SVGFile.js?");

/***/ }),

/***/ "./source/fileList/fileUploader/Uploader.js":
/*!**************************************************!*\
  !*** ./source/fileList/fileUploader/Uploader.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Uploader: () => (/* binding */ Uploader)\n/* harmony export */ });\n/* harmony import */ var _utility_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/Element */ \"./source/utility/Element.js\");\n\n\nclass Uploader {\n    //ファイルをアップロードする関数\n    parentElement;\n    inputElementId;\n    inputElement;\n    buttonElement;\n    pElement;\n\n    constructor(ParentElementId, IdName) {\n        this.parentElement_id = ParentElementId;\n        this.idName = IdName;\n\n        //要素を作る\n        this.buttonElement = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.parentElement_id, \"id\",this.idName + \"_buttonElement\", \"button\");\n        this.inputElement = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.buttonElement.getDOMElement(), \"id\", this.idName +\"_inputElement\", \"input\");\n        this.pElement = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.buttonElement.getDOMElement(), \"id\", this.idName +\"_pElement\", \"p\");\n        this.pElement.getDOMElement().textContent = '+';\n\n        //wrapperであるbutton要素がクリックされた時に、input要素のボタンを発火させている\n        this.buttonElement.getDOMElement().addEventListener(\"click\", () => {\n                this.inputElement.getDOMElement().click();\n        });\n    }\n\n    getDOMElement(TargetElement){\n        if(TargetElement == \"button\"){return this.buttonElement.getDOMElement();}\n        else if(TargetElement == \"input\"){return this.inputElement.getDOMElement();}\n        }\n}\n\n//# sourceURL=webpack:///./source/fileList/fileUploader/Uploader.js?");

/***/ }),

/***/ "./source/fileList/fileUploader/UploaderStyle.js":
/*!*******************************************************!*\
  !*** ./source/fileList/fileUploader/UploaderStyle.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UploaderStyle: () => (/* binding */ UploaderStyle)\n/* harmony export */ });\nclass UploaderStyle {\n    constructor() {\n        this.uploadButton_buttonStyle = document.createElement(\"style\");\n        this.uploadButton_buttonStyle_hover = document.createElement(\"style\");\n        this.uploadButton_inputStyle = document.createElement(\"style\");\n        this.uploadButton_pStyle = document.createElement(\"style\");\n        this.uploadButton_pStyle_hover = document.createElement(\"style\");\n        document.head.appendChild(this.uploadButton_buttonStyle);\n        document.head.appendChild(this.uploadButton_inputStyle);\n        document.head.appendChild(this.uploadButton_pStyle);\n        document.head.appendChild(this.uploadButton_buttonStyle_hover);\n        document.head.appendChild(this.uploadButton_pStyle_hover);\n        this.uploadButton_buttonStyle.sheet.insertRule(`\n        #uploader_buttonElement {\n        margin:5px;\n        width: 200px;\n        height: 30px;\n        background-color: \n        #FFFFFF;\n        border-radius: \n        5px;box-shadow: 0px 0px 7px #909090; \n        display: flex;\n        flex-direction: column;\n        justify-content: center;\n        align-items: center;\n        }`, 0);\n        this.uploadButton_inputStyle.sheet.insertRule(`\n        #uploader_inputElement {\n        display: none;\n        }`, 0);\n        this.uploadButton_pStyle.sheet.insertRule(`\n        #uploader_pElement {\n        color: #000000;\n        font-size:15px;\n                }`, 0);\n        this.uploadButton_buttonStyle_hover.sheet.insertRule(`\n        #uploader_buttonElement:hover{\n        background-color: \n        #555555;\n        }`, 0);\n        this.uploadButton_pStyle_hover.sheet.insertRule(`\n        #uploader_buttonElement:hover #uploader_pElement{\n        color: #FFFFFF;\n        font-size:15px;\n        }`, 0);\n    }\n}\n\n//# sourceURL=webpack:///./source/fileList/fileUploader/UploaderStyle.js?");

/***/ }),

/***/ "./source/fileList/svgLoader.js":
/*!**************************************!*\
  !*** ./source/fileList/svgLoader.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SvgButton: () => (/* binding */ SvgButton),\n/* harmony export */   SvgCircleAnalyzer: () => (/* binding */ SvgCircleAnalyzer),\n/* harmony export */   SvgLoader: () => (/* binding */ SvgLoader)\n/* harmony export */ });\n/* harmony import */ var _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../eventListener/eventListener */ \"./source/eventListener/eventListener.js\");\n\r\n\r\n/**\r\n   * svgElementを読み込むクラス。\r\n   * @param {HTMLInputElement} TargetFile -inputから受け取ったデータを入力(event.target.files[0]);\r\n   */\r\nclass SvgLoader {\r\n  rawData;\r\n  url;\r\n  svgElements;\r\n\r\n  constructor(TargetFile = null) {\r\n    this.rawData = TargetFile;\r\n    this.url = URL.createObjectURL(this.rawData);\r\n\r\n    this.loadSVG();\r\n  }\r\n\r\n  loadSVG() {\r\n    if(this.rawData == null) {\r\n      throw new Error('rawDataの値が入力されていません。')\r\n    }\r\n\r\n    this.svgElements = new Promise(async (resolve, reject) => {\r\n      try {\r\n        const response = await fetch(this.url);\r\n        const data = await response.text();\r\n        const parser = new DOMParser(); // DOMParserを作成\r\n        const svgDoc = parser.parseFromString(data, 'image/svg+xml'); // SVGデータを解析\r\n        resolve(svgDoc.querySelector('svg'));\r\n      } catch (error) {\r\n        console.error(error);\r\n        reject(error);\r\n      }\r\n    })\r\n  }\r\n}\r\n\r\n/**\r\n   * inputタグを使用可能な状態にします。\r\n   * @param {HTMLInputElement | string} selector -inputタグを直接渡すか、id名を書いてください。\r\n   */\r\nclass SvgButton {\r\n  inputElement;\r\n\r\n  #svgLoader;\r\n  svgElements;\r\n\r\n  #eventListener;\r\n\r\n  constructor(selector) {\r\n    this.#eventListener = new _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_0__.EventListener();\r\n\r\n    console.log(selector);\r\n    if (typeof selector === 'string') {\r\n      this.inputElement = document.querySelector(selector);\r\n    } else {\r\n      this.inputElement = selector;\r\n    }\r\n\r\n    this.inputElement.addEventListener('change', async (event) => {\r\n      console.log(\"アップロード成功\");\r\n      this.#svgLoader = new SvgLoader(event.target.files[0]);\r\n      event.target.value = null;\r\n      this.svgElements = new Promise(async (resolve, reject) => {\r\n        \r\n        try {\r\n          const result = await this.#svgLoader.svgElements;\r\n          resolve(result);\r\n          this.#eventListener.dispatch('svgLoaded', result);\r\n        } catch (error) {\r\n          reject(error);\r\n        }\r\n      })\r\n    })\r\n  }\r\n\r\n  get svgLoader() {\r\n    return this.#svgLoader;\r\n  }\r\n\r\n  get eventListener() {\r\n    return this.#eventListener;\r\n  }\r\n\r\n  /**\r\n   * svgElementを読み込むクラス。\r\n   * @param {string | svgLoaded} name -現状svgLoaded以外にイベントはありません。\r\n   * @param {(svgElements) =>} callback -任意のコールバック関数を入力してください。()内にはsvgElementsが渡されます。\r\n   */\r\n  addEventListener(name, callback) {\r\n    if(name != 'svgLoaded') throw new Error('該当するイベント名はありません。');\r\n    this.#eventListener.add(name, callback, this);\r\n  }\r\n}\r\n\r\n/**\r\n   * svgElementsから位置情報や大きさなどを取り出すクラス。\r\n   * @param {svgElements} svgElements -svgLoaderクラスで取り出したsvgElementsを入れてください。\r\n   * @param {center | left} svgElements -座標の読み込み基準を決められます。\r\n   */\r\nclass SvgCircleAnalyzer {\r\n  svgElements;\r\n  svgCircleElements;\r\n  svgViewBoxSize;\r\n\r\n  circles;\r\n\r\n  constructor(svgElements, mode = 'center') {\r\n    if (mode != 'center' && mode != 'left') {\r\n      throw new Error('ReferenceModeに渡された値が不正です。centerもしくはleftを渡してください');\r\n    }\r\n\r\n    this.svgElements = svgElements\r\n\r\n    const viewBoxValues = this.svgElements.getAttribute('viewBox').split(' ').map((param) => +param);\r\n    this.svgViewSize = {\r\n      width: viewBoxValues[2],\r\n      height: viewBoxValues[3],\r\n    }\r\n\r\n    this.circles = [];\r\n    const circleElements = this.svgElements.querySelectorAll('circle');\r\n    for(const circleElement of circleElements) {\r\n      let circle = {\r\n        position: {\r\n          x: null,\r\n          y: null,\r\n        },\r\n        radius: null,\r\n        fill: null,\r\n        strokeColor: null,\r\n        strokeWeight: null,\r\n      }\r\n\r\n      switch (mode) {\r\n        case 'left':\r\n          circle.position.x = parseFloat(circleElement.getAttribute('cx'));\r\n          circle.position.y = parseFloat(circleElement.getAttribute('cy'));\r\n          break;\r\n        case 'center':\r\n          circle.position.x = parseFloat(circleElement.getAttribute('cx') - this.svgViewSize.width / 2);\r\n          circle.position.y = parseFloat(circleElement.getAttribute('cy') - this.svgViewSize.height / 2);\r\n          break;\r\n      }\r\n\r\n      circle.radius = parseFloat(circleElement.getAttribute('r'));\r\n      circle.fill = circleElement.getAttribute('fill'); //数値に直す必要がないので注意\r\n      circle.strokeColor = circleElement.getAttribute('stroke');\r\n      circle.strokeWeight = parseFloat(circleElement.getAttribute('stroke-width'));\r\n\r\n      this.circles.push(circle);\r\n    }\r\n  }\r\n\r\n  /**\r\n   * 読み込んだcirclesの配列の長さを取得する。\r\n   */\r\n  getLength() {\r\n    return this.circles.length;\r\n  }\r\n\r\n  /**\r\n   * 読み込んだsvgファイルのキャンパスサイズを取得する。\r\n   */\r\n  getViewSize() {\r\n      return this.svgViewSize;\r\n  }\r\n\r\n  /**\r\n   * 特定のcircleの情報だけを取得する。\r\n   */\r\n  getCircleElement(i) {\r\n      return this.circles[i];\r\n  }\r\n\r\n  /**\r\n   * 読み込んだsvgの情報を配列として書き出すことができる。\r\n   */\r\n  getArray() {\r\n      return this.circles;\r\n  }\r\n}\n\n//# sourceURL=webpack:///./source/fileList/svgLoader.js?");

/***/ }),

/***/ "./source/main.js":
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MotionManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MotionManager */ \"./source/MotionManager.js\");\n/* harmony import */ var _ControlManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ControlManager */ \"./source/ControlManager.js\");\n/* harmony import */ var _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./eventListener/eventListener */ \"./source/eventListener/eventListener.js\");\n\n\n\n\nlet motionManager;\nlet controlManager;\n\nwindow.onload = createUploadButton;\nfunction createUploadButton() {\n\n    motionManager = new _MotionManager__WEBPACK_IMPORTED_MODULE_0__.MotionManager();\n    controlManager = new _ControlManager__WEBPACK_IMPORTED_MODULE_1__.ControlManager();\n\n    motionManager.updateMotionData(0, motionArray);\n    console.log(motionManager.getMotionData(0));\n    console.log(motionManager.event);\n}\n\n\n\n//# sourceURL=webpack:///./source/main.js?");

/***/ }),

/***/ "./source/timeline/MotionObject/HandleElement.js":
/*!*******************************************************!*\
  !*** ./source/timeline/MotionObject/HandleElement.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HandleElement: () => (/* binding */ HandleElement)\n/* harmony export */ });\n/* harmony import */ var _utility_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/Element */ \"./source/utility/Element.js\");\n/* harmony import */ var _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../eventListener/eventListener */ \"./source/eventListener/eventListener.js\");\n\n\n\nclass HandleElement {\n    constructor(ParentElement_id, ClassName, ParentEvent) {\n        this.parentElement_id = ParentElement_id;\n        this.className = ClassName;\n        this.parentEvent = ParentEvent;\n\n\n        this.handle = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.parentElement_id, \"class\", this.className, \"div\");\n\n        //今操作されているかどうかの変数\n        this.isInteracted = false;\n        //イベントリスナー\n        this.event = new _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_1__.EventListener();\n\n\n\n        this.setHandleStyle();\n        this.setInteractedEvent();\n        this.setMovingEvent();\n    }\n\n    setHandleStyle() {\n        this.styles = {\n            width: '15px',\n            height: '100%',\n            boxShadow: \"0px 0px 7px #222222\",\n            borderRadius: \"3px\",\n            backgroundColor: \"#000000\",\n            cursor: \"col-resize\",\n        };\n        this.handle.setStyle(this.styles);\n    }\n\n    setInteractedEvent() {\n        this.handle.getDOMElement().addEventListener(\"mousedown\", (event) => {\n            this.isInteracted = true;\n            this.parentEvent.dispatch(\"startInteracted\");\n        });\n        document.addEventListener(\"mouseup\", () => {\n            if (this.isInteracted == true) {\n                this.parentEvent.dispatch(\"interacted\");\n            }\n            this.isInteracted = false;\n        });\n    }\n    //この実装はかなり良くない気がするのでやめた方がいいかもしれない\n    setMovingEvent() {\n        document.addEventListener(\"mousemove\", (event) => {\n            if (this.isInteracted == true) {\n                this.parentEvent.dispatch(\"moving\",event);\n            }\n        });\n    }\n\n}\n\n//# sourceURL=webpack:///./source/timeline/MotionObject/HandleElement.js?");

/***/ }),

/***/ "./source/timeline/MotionObject/MotionObject.js":
/*!******************************************************!*\
  !*** ./source/timeline/MotionObject/MotionObject.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MotionObject: () => (/* binding */ MotionObject)\n/* harmony export */ });\n/* harmony import */ var _utility_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/Element */ \"./source/utility/Element.js\");\n/* harmony import */ var _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../eventListener/eventListener */ \"./source/eventListener/eventListener.js\");\n/* harmony import */ var _HandleElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HandleElement */ \"./source/timeline/MotionObject/HandleElement.js\");\n/* harmony import */ var _TextsElement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TextsElement */ \"./source/timeline/MotionObject/TextsElement.js\");\n\n\n\n\n\nclass MotionObject {\n    style;\n    parentELement_id;\n    objectNumber;\n    object;\n    object_id;\n    styles;\n    width;\n    startFrame;\n    endFrame;\n    duration;\n    isSelect;\n    textsElement;\n    handleElement;\n    parentEvent;\n    mouseX;\n    initMouseX;\n    currentMouseX;\n    mouseXDifference;\n    frameRatio;\n\n\n    constructor(ParentELement_id, ObjectNumber, ParentEvent) {\n\n        this.parentELement_id = ParentELement_id;\n        this.objectNumber = ObjectNumber;\n        this.parentEvent = ParentEvent;\n\n        this.width = 300;\n        this.isSelected = false;\n        this.mouseX = 0;\n        this.initMouseX = 0;\n        this.currentMouseX = 0;\n        this.mouseXDifference = 0;\n        this.frameRatio = 2;//実際のpxとフレーム数の比率を調整している。\n\n        //ここでこのMotionObjectのDOM要素を生成\n        this.object_id = `motionObject_${this.objectNumber}`;\n        this.object = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.parentELement_id, \"id\", this.object_id, \"div\");\n        //クラスを設定する\n        this.object.setClassList(['motionObject_baseStyle', 'motionObject_hoverStyle', 'motionObject_notSelected']);\n        //styleのセットアップ\n        this.initStyle();\n        this.setClickEvent();\n        this.setMargin(this.frameRatio);\n\n\n        //イベントの設定\n        this.event = new _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_1__.EventListener();\n        this.event.add(\"startInteracted\", () => {\n            console.log(\"動かし始めた\");\n            document.documentElement.style.cursor = \"col-resize\";//動かしてる時はカーソルの見た目を変える\n            this.mouseXDifference = this.currentMouseX - this.initMouseX;\n            this.initMouseX = this.mouseX;\n        });\n        this.event.add(\"interacted\", () => {\n            console.log(\"動いた\");\n            document.documentElement.style.cursor = \"auto\";//カーソルの見た目を戻す\n            this.mouseXDifference = this.floatToInt(this.currentMouseX - this.initMouseX);//最終的にframeRatioの倍数になる\n            this.setObjectWidth(this.width + this.mouseXDifference);//初期値がframeRatioの倍数なら、新しいwidthもframeRatioの倍数\n            this.updateFrame();//start,end,durationを更新\n            this.textsElement.setText(\"duration\", this.duration);\n            this.textsElement.setText(\"startFrame\", this.startFrame);\n            this.textsElement.setText(\"endFrame\", this.endFrame);\n            this.parentEvent.dispatch(\"motionObjectChanged\");\n        });\n        this.event.add(\"moving\", () => {\n            this.currentMouseX = this.mouseX;\n            let preEndFrame = (this.floatToInt(this.currentMouseX - this.initMouseX) + this.width) / this.frameRatio;\n            this.textsElement.setText(\"endFrame\", `${preEndFrame}`);\n        });\n        this.event.add(\"selected\", () => {\n            this.parentEvent.dispatch(\"motionObjectClicked\", this.objectNumber);\n            this.setIsSelected(true);\n            this.setSelectStyle(true);\n        });\n\n\n        //テキストを作成\n        this.textsElement = new _TextsElement__WEBPACK_IMPORTED_MODULE_3__.TextsElement(this.object.getDOMElement(), \"motionObject_textElement\");\n        this.textsElement.setText(\"duration\", this.duration);\n        this.textsElement.setText(\"startFrame\", this.startFrame);\n        this.textsElement.setText(\"endFrame\", this.endFrame);\n        //ハンドルを生成\n        this.handleElement = new _HandleElement__WEBPACK_IMPORTED_MODULE_2__.HandleElement(this.object.getDOMElement(), \"endHandle\", this.event);\n    }\n\n    setMotionType(MotionType) {\n        this.textsElement.setText(\"motionType\", MotionType);\n    }\n    setFrames(StartFrame, EndFrame) {\n        this.startFrame = StartFrame;\n        this.endFrame = EndFrame;\n        this.duration = (this.endFrame + 1) - this.startFrame;\n        this.width = (this.duration + this.frameRatio) * this.frameRatio;\n        this.textsElement.setText(\"duration\", this.duration);\n        this.textsElement.setText(\"startFrame\", this.startFrame);\n        this.textsElement.setText(\"endFrame\", this.endFrame);\n        this.setObjectWidth(this.width);\n    }\n\n    initStyle() {\n        this.styles = {\n            width: `${this.width}px`\n        };\n        this.object.setStyle(this.styles);\n    }\n\n    setObjectWidth(value) {\n        if (value >= 10 * this.frameRatio) {\n            this.width = value;\n        } else { this.width = 10 * this.frameRatio }\n        this.styles = {\n            width: `${this.width}px`\n        };\n        this.object.setStyle(this.styles);\n    }\n\n    setMargin(value) {//ひとつのmotionObjectの次のオブジェクトを一フレーム前に押し出すためのマージン設定\n        this.styles = {\n            marginRight: `${value}px`\n        };\n        this.object.setStyle(this.styles);\n    }\n\n    setSelectStyle(IsSelected) {\n        if (IsSelected) {\n            //選択状態にする\n            this.object.replaceClassList(\"motionObject_notSelected\", \"motionObject_selected\");\n        }\n        else if (!IsSelected) {\n            //未選択状態にする\n            this.object.replaceClassList(\"motionObject_selected\", \"motionObject_notSelected\");\n        }\n    }\n    setIsSelected(value) {\n        this.isSelected = value;\n    }\n\n    setClickEvent() {\n        this.object.getDOMElement().addEventListener(\"mousedown\", () => {\n            this.event.dispatch(\"selected\");\n        });\n    }\n\n    setMouseX(X) {\n        this.mouseX = X;\n    }\n\n    floatToInt(number) {\n        return this.frameRatio * Math.ceil(number / this.frameRatio);\n    }\n\n\n    updateFrame() {\n        // div要素を取得\n        let timeLineElement = document.getElementById(\"timeline\");\n        // div要素のバウンディングボックスを取得\n        let ParentRect = timeLineElement.getBoundingClientRect();\n        let MotionObjectRect = this.object.getDOMElement().getBoundingClientRect();\n        // div要素の左端からのMotionObjectの相対X座標を計算\n        this.startFrame = (MotionObjectRect.left - ParentRect.left + timeLineElement.scrollLeft) / this.frameRatio;\n        this.endFrame = ((MotionObjectRect.right) - ParentRect.left + timeLineElement.scrollLeft) / this.frameRatio;\n        this.duration = (this.endFrame + 1) - this.startFrame;\n    }\n\n    get frames() {\n        let frames = {\n            startFrame: this.startFrame,\n            endFrame: this.endFrame,\n            duration: this.duration\n        }\n        return frames;\n    }\n}\n\n//# sourceURL=webpack:///./source/timeline/MotionObject/MotionObject.js?");

/***/ }),

/***/ "./source/timeline/MotionObject/SetMotionObjectClassStyle.js":
/*!*******************************************************************!*\
  !*** ./source/timeline/MotionObject/SetMotionObjectClassStyle.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SetMotionObjectClassStyle: () => (/* binding */ SetMotionObjectClassStyle)\n/* harmony export */ });\n/* harmony import */ var _utility_Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/Style */ \"./source/utility/Style.js\");\n\n\nclass SetMotionObjectClassStyle{\n    constructor(){\n        this.createMotionObjectStyle();\n    }\n\n    createMotionObjectStyle(){\n        let motionObject_baseStyles = `\n        .motionObject_baseStyle{\n            height: 15vh;\n            flex-shrink: 0;\n            display: grid;\n            grid-template-columns: 1fr 15px;\n            box-sizing: border-box;\n            box-shadow: 0px 0px 7px #000000;\n            border-radius: 5px;\n        }`;\n        let motionObject_baseStyle = new _utility_Style__WEBPACK_IMPORTED_MODULE_0__.Style(motionObject_baseStyles);\n        let normalStyles = `\n        .motionObject_hoverStyle{\n            background-color: #555555;\n        }`;\n        let normalStyle = new _utility_Style__WEBPACK_IMPORTED_MODULE_0__.Style(normalStyles);\n        let hoverStyles = `\n        .motionObject_hoverStyle:hover{\n            background-color: #BBBBBB;\n        }`;\n        let hoverStyle = new _utility_Style__WEBPACK_IMPORTED_MODULE_0__.Style(hoverStyles);\n        let notSelectedStyles = `\n        .motionObject_notSelected{\n            border: 2px solid #000000;\n        }`;\n        let notSelectedStyle = new _utility_Style__WEBPACK_IMPORTED_MODULE_0__.Style(notSelectedStyles);\n        let selectedStyles = `\n        .motionObject_selected{\n            border: 2px solid #FF0000;\n        }`;\n        let selectedStyle = new _utility_Style__WEBPACK_IMPORTED_MODULE_0__.Style(selectedStyles);\n    }\n}\n\n//# sourceURL=webpack:///./source/timeline/MotionObject/SetMotionObjectClassStyle.js?");

/***/ }),

/***/ "./source/timeline/MotionObject/TextsElement.js":
/*!******************************************************!*\
  !*** ./source/timeline/MotionObject/TextsElement.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TextsElement: () => (/* binding */ TextsElement)\n/* harmony export */ });\n/* harmony import */ var _utility_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utility/Element */ \"./source/utility/Element.js\");\n\n\nclass TextsElement{\n    constructor(ParentElement_id, ClassName){\n        this.parentElement_id = ParentElement_id;\n        this.className = ClassName;\n        this.text = \"created\"\n        this.textContainer = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.parentElement_id, \"class\", \"MotionObject_textContainer\", \"div\");\n        this.textElement = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.textContainer.getDOMElement(), \"class\", this.className, \"p\");\n        this.textElements = {\n            duration: new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.textContainer.getDOMElement(), \"class\", this.className, \"p\"),\n            startFrame: new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.textContainer.getDOMElement(), \"class\", this.className, \"p\"),\n            endFrame: new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.textContainer.getDOMElement(), \"class\", this.className, \"p\"),\n            motionType: new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.textContainer.getDOMElement(), \"class\", this.className, \"p\"),\n        }\n        this.setTextStyle();\n        this.initText();\n    }\n\n    setTextStyle(){\n        this.styles = {\n            color: \"#00FF00\",\n            userSelect: \"none\",\n        };\n        this.textElements.duration.setStyle(this.styles);\n        this.textElements.startFrame.setStyle(this.styles);\n        this.textElements.endFrame.setStyle(this.styles);\n        this.textElements.motionType.setStyle(this.styles);\n\n        this.styles = {\n            minWidth: 0,\n            overflowX: \"scroll\",\n        }\n        this.textContainer.setStyle(this.styles);\n    }\n\n    initText(){\n        this.setText(\"motionType\",\"focus\");\n    }\n    setText(TextType, Text){\n        this.textElements[TextType].getDOMElement().textContent = null;\n        this.textElements[TextType].getDOMElement().textContent = `${TextType} : ` + Text;\n        }\n}\n\n//# sourceURL=webpack:///./source/timeline/MotionObject/TextsElement.js?");

/***/ }),

/***/ "./source/timeline/MotionObjectContainer.js":
/*!**************************************************!*\
  !*** ./source/timeline/MotionObjectContainer.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MotionObjectContainer: () => (/* binding */ MotionObjectContainer)\n/* harmony export */ });\n/* harmony import */ var _utility_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/Element */ \"./source/utility/Element.js\");\n\n\n//MotionObjectをdivの中に入れたいので、htmlの階層のためだけに作ったクラス\nclass MotionObjectContainer {\n    parentElement_id;\n    name;\n    motionContainer;\n    styles;\n\n    constructor(ParentElement_id, TagName) {\n        this.parentElement_id = ParentElement_id;\n        this.tagName = TagName;\n        this.motionContainer = new _utility_Element__WEBPACK_IMPORTED_MODULE_0__.Element(this.parentElement_id, \"id\", this.tagName, \"div\");\n        this.setContainerStyle();\n    }\n\n    setContainerStyle() {\n        this.styles = {\n            height: \"15vh\",\n            display: \"flex\",\n            flexDirection: \"row\",\n            marginTop: \"7vh\",\n            marginRight: \"30vw\"\n        };\n        this.motionContainer.setStyle(this.styles);\n    }\n}\n\n//# sourceURL=webpack:///./source/timeline/MotionObjectContainer.js?");

/***/ }),

/***/ "./source/timeline/Timeline.js":
/*!*************************************!*\
  !*** ./source/timeline/Timeline.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Timeline: () => (/* binding */ Timeline)\n/* harmony export */ });\n/* harmony import */ var _utility_Element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utility/Element */ \"./source/utility/Element.js\");\n/* harmony import */ var _TimelineStye__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TimelineStye */ \"./source/timeline/TimelineStye.js\");\n/* harmony import */ var _MotionObject_MotionObject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MotionObject/MotionObject */ \"./source/timeline/MotionObject/MotionObject.js\");\n/* harmony import */ var _MotionObjectContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MotionObjectContainer */ \"./source/timeline/MotionObjectContainer.js\");\n/* harmony import */ var _MotionObject_SetMotionObjectClassStyle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MotionObject/SetMotionObjectClassStyle */ \"./source/timeline/MotionObject/SetMotionObjectClassStyle.js\");\n/* harmony import */ var _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../eventListener/eventListener */ \"./source/eventListener/eventListener.js\");\n\n\n\n\n\n\n\nclass Timeline {\n    parentElementStyle;\n    parentElement_id;\n    motionObjectContainer;\n    motionObjectContainer_id;\n    motionObjects = [];\n    motionObjectClassStyle;\n    event;\n    selectedObjectNumber;\n    mouseX;\n\n\n    constructor(ParentElement_id) {\n        //タイムラインのstyleの設定\n        this.parentElement_id = ParentElement_id;\n        this.parentElementStyle = new _TimelineStye__WEBPACK_IMPORTED_MODULE_1__.TimelineStyle(this.parentElement_id);\n        //イベントの設定\n        this.event = new _eventListener_eventListener__WEBPACK_IMPORTED_MODULE_5__.EventListener();\n        this.event.add(\"motionObjectClicked\", (SelectedObjectNumber) => {\n            this.selectedObjectNumber = SelectedObjectNumber;\n            this.allMotionObjectsResetSelect();\n        });\n        this.event.add(\"motionObjectChanged\");\n        this.event.add(\"framePointerMoved\");\n\n        //motionObjectContainerの作成\n        this.motionObjectContainer_id = \"motionObjectContainer\";\n        this.motionObjectContainer = new _MotionObjectContainer__WEBPACK_IMPORTED_MODULE_3__.MotionObjectContainer(this.parentElement_id, this.motionObjectContainer_id);\n\n        //motionObjectのstylesの設定をしている\n        this.motionObjectClassStyle = new _MotionObject_SetMotionObjectClassStyle__WEBPACK_IMPORTED_MODULE_4__.SetMotionObjectClassStyle();\n\n        this.setMouseXCalcEventListener()\n    }\n\n    //これでMotionObjectが増やせるよ\n    pushMotionObject() {\n        this.motionObjects.push(new _MotionObject_MotionObject__WEBPACK_IMPORTED_MODULE_2__.MotionObject(this.motionObjectContainer_id, this.motionObjects.length, this.event));\n    }\n    //これでMotionTypeの表示を変更できるよ\n    setMotionType(MotionType){\n        if(this.selectedObjectNumber == undefined){return}\n        this.motionObjects[this.selectedObjectNumber].setMotionType(MotionType);\n    }\n    //これでMotionObjectのframe関連を設定できるよ\n    setMotionObjectFrames(MotionObjectNum, StartFrame, EndFrame){\n        this.motionObjects[MotionObjectNum].setFrames(StartFrame, EndFrame);\n    }\n\n\n\n    allMotionObjectsResetSelect() {\n        for (let obj of this.motionObjects) {\n            obj.setIsSelected(false);\n            obj.setSelectStyle(false);\n        }\n    }\n\n    setMouseXCalcEventListener(){\n        //mouseXの計算\n        // div要素を取得\n        this.timeLineElement = document.getElementById(this.parentElement_id);\n        // mousemoveイベントをリスンする\n        this.timeLineElement.addEventListener('mousemove', (event) => {\n            // div要素のバウンディングボックスを取得\n            const rect = this.timeLineElement.getBoundingClientRect();\n            // div要素の左端からのマウスの相対X座標を計算\n            this.mouseX = event.clientX - rect.left + this.timeLineElement.scrollLeft;\n            //motionObjectに現在のtimeline上のmouseXを設定する\n            for(let obj of this.motionObjects){\n                obj.setMouseX(this.mouseX);\n            }\n        });\n    }\n\n    getSelectedObjectNumber(){\n        return this.selectedObjectNumber;\n    }\n    getMotionObjectFrames(i){\n        return this.motionObjects[i].frames;\n    }\n    \n}\n\n//# sourceURL=webpack:///./source/timeline/Timeline.js?");

/***/ }),

/***/ "./source/timeline/TimelineStye.js":
/*!*****************************************!*\
  !*** ./source/timeline/TimelineStye.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TimelineStyle: () => (/* binding */ TimelineStyle)\n/* harmony export */ });\nclass TimelineStyle {\n    targetElement_id;\n    timelineStyle;\n    timelineWidth;\n\n    constructor(TargetElement_id) {\n        this.timelineWidth = 0;\n        this.targetElement_id = TargetElement_id\n        this.timelineStyle = document.createElement(\"style\");\n        document.head.appendChild(this.timelineStyle);\n        this.timelineStyle.sheet.insertRule(`\n        #${this.targetElement_id} {\n                    width: 99vw;\n                    min-width: 99vw;\n                    height: 30vh;\n                    background-color: #555560;\n                    border-radius: 5px;\n                    box-shadow: 0px 0px 7px #909090;\n                    position: fixed;\n                    top: 69vh;\n                    left: 0.5vw;\n                    display: flex;\n                    flex-direction: row;\n                    overflow-x: scroll;\n                    user-select: none;\n                }`, 0);\n    }\n}\n\n\n\n//# sourceURL=webpack:///./source/timeline/TimelineStye.js?");

/***/ }),

/***/ "./source/utility/Element.js":
/*!***********************************!*\
  !*** ./source/utility/Element.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Element: () => (/* binding */ Element)\n/* harmony export */ });\n\nclass Element {\n    parentElement;\n    tagDetector;\n    name;\n    DOMType;\n    element;\n    styles;\n\n    constructor(ParentElement, TagDetector, Name, DOMType) {\n        if (typeof ParentElement == \"string\") { this.parentElement = document.getElementById(ParentElement); }\n        else { this.parentElement = ParentElement; }\n        this.tagDetector = TagDetector;\n        this.name = Name;\n        this.DOMType = DOMType;\n        this.createElement();\n    }\n\n    createElement() {\n        this.element = document.createElement(this.DOMType);//box要素を作る\n        if (this.DOMType == \"input\") { this.element.type = 'file'; }\n        this.element.setAttribute(this.tagDetector, this.name);//idをつける\n        this.parentElement.appendChild(this.element);\n    }\n\n    getDOMElement() {\n        return this.element;\n    }\n\n    setTag(TagDetector, Name) {\n        this.element.setAttribute(TagDetector, Name);//tagをつける\n    }\n\n    setClassList(ClassNames) {\n        this.getDOMElement().classList.add(...ClassNames);\n    }\n\n    replaceClassList(RemoveClass, AddClass) {\n        if (this.getDOMElement().classList.contains(RemoveClass)){ \n            this.getDOMElement().classList.remove(RemoveClass);\n            this.getDOMElement().classList.add(AddClass);\n        }\n    }\n\n    setStyle(Styles) {\n        //こんな感じでStyleを渡してください\n        // this.styles = {\n        //     width: '300px',\n        //     height: '30px',\n        //     backgroundColor: '#FFFFFF',\n        //     margin: \"5px\",\n        //     flexShrink: 0\n        // };\n        this.styles = Styles;\n        for (let property in this.styles) {\n            this.getDOMElement().style[property] = this.styles[property];\n        }\n\n    }\n}\n\n\n//# sourceURL=webpack:///./source/utility/Element.js?");

/***/ }),

/***/ "./source/utility/Style.js":
/*!*********************************!*\
  !*** ./source/utility/Style.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Style: () => (/* binding */ Style)\n/* harmony export */ });\n//スタイルエレメントを登録するためのクラス\n\nclass Style{\n    tagDetector;\n    targetElement_name;\n    styles;\n    styleElement\n\n    constructor(Styles){\n        this.styles = Styles;\n        this.createStyle();\n    }\n\n    createStyle(){\n        this.styleElement = document.createElement('style');\n        this.styleElement.textContent =this.styles;\n        document.head.appendChild(this.styleElement);\n    }\n}\n\n//# sourceURL=webpack:///./source/utility/Style.js?");

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