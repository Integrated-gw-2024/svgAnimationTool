//svgFileListは画面右のあのリストのことを言っているよ
//fileはsvgFileとdivの二つで構成されているよ
//divにはスタイルをつける用のクラスがあるよ

import { SvgButton } from "./svgLoader";
import { SvgCircleAnalyzer } from "./svgLoader";
import { Uploader } from "./fileUploader/Uploader";
import { Element } from "./Element";




export class FileList {
    files = [];
    parentElement;
    fileBox;
    uploadButtonBox;
    analyzer;
    style;

    constructor(ParentElement) {
        this.parentElement = ParentElement;

        this.style = new FileStyle();

        //wrapperを作る
        this.fileBox = new Element(this.parentElement, "id", "fileBox", "div");
        this.uploadButtonBox = new Element(this.parentElement, "id", "uploadButtonBox", "div");
        this.uploader = new Uploader("uploadButtonBox", "uploader");//inputElementを作成する
        this.inputButton = new SvgButton("#uploader_inputElement");//inputElementのイベントリスナーを生成

        this.inputButton.addEventListener('svgLoaded', (event) => {
            this.analyzer = new SvgCircleAnalyzer(event);
            //ここでfileListにデータを保存する
            this.files.push({
                file: new SVGfile(this.analyzer.getArray()),
                div: new FileDivManager(this.fileBox.getDOMElement())
            });
        });
    }

    getFilesLength() {
        return this.files.length;
    }
    getSvgData(i) {
        return this.files[i].getArray();
    }
}


export class SVGfile {
    svgArray;

    constructor(svgArray) {
        this.svgArray = svgArray;
    }

    getArray() {
        return this.svgArray;
    }
}

export class FileDivManager {
    divElement;
    pElement;
    divStyle;

    constructor(ParentElement) {
        this.parentElement = ParentElement;
        this.divElement = new Element(this.parentElement, "class", "file_divElement", "div")
        this.pElement = new Element(this.divElement.getDOMElement(), "class", "file_pElement", "p");
        this.pElement.getDOMElement().textContent = 'アップロード済み!';
    }
}

export class FileStyle {
    targetElement;
    style;

    constructor() {
        // this.tags = Tags;
        //スタイル エレメントを作成
        this.div_divStyle = document.createElement("style");
        this.div_pStyle = document.createElement("style");
        this.uploadButton_buttonStyle = document.createElement("style");
        this.uploadButton_buttonStyle_hover = document.createElement("style");
        this.uploadButton_inputStyle = document.createElement("style");
        this.uploadButton_pStyle = document.createElement("style");
        this.uploadButton_pStyle_hover = document.createElement("style");
        //スタイルをヘッダに入れる
        document.head.appendChild(this.div_divStyle);
        document.head.appendChild(this.div_pStyle);
        document.head.appendChild(this.uploadButton_buttonStyle);
        document.head.appendChild(this.uploadButton_inputStyle);
        document.head.appendChild(this.uploadButton_pStyle);
        document.head.appendChild(this.uploadButton_buttonStyle_hover);
        document.head.appendChild(this.uploadButton_pStyle_hover);
        //スタイルシートの設定
        this.div_divStyle.sheet.insertRule(`
        .file_divElement {
                    margin:5px;
                    width: 200px;
                    height: 30px;
                    background-color: 
                    #555555;border-radius: 
                    5px;box-shadow: 0px 0px 7px #909090; 
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }`, 0);
        this.div_pStyle.sheet.insertRule(`
                .file_pElement {
                    color:#FFFFFF;
                    font-size:15px;
                }`, 0);
        this.uploadButton_buttonStyle.sheet.insertRule(`
        #uploader_buttonElement {
        margin:5px;
        width: 200px;
        height: 30px;
        background-color: 
        #FFFFFF;
        border-radius: 
        5px;box-shadow: 0px 0px 7px #909090; 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        }`, 0);
        this.uploadButton_inputStyle.sheet.insertRule(`
        #uploader_inputElement {
        display: none;
        }`, 0);
        this.uploadButton_pStyle.sheet.insertRule(`
        #uploader_pElement {
        color: #000000;
        font-size:15px;
                }`, 0);
        this.uploadButton_buttonStyle_hover.sheet.insertRule(`
        #uploader_buttonElement:hover{
        background-color: 
        #555555;
        }`, 0);
        this.uploadButton_pStyle_hover.sheet.insertRule(`
        #uploader_buttonElement:hover #uploader_pElement{
        color: #FFFFFF;
        font-size:15px;
        }`, 0);
    }
}