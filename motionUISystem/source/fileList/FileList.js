//svgFileListは画面右のあのリストのことを言っているよ
//fileはsvgFileとdivの二つで構成されているよ
//divにはスタイルをつける用のクラスがあるよ

import { SvgButton } from "./svgLoader";
import { SvgCircleAnalyzer } from "./svgLoader";
import { Uploader } from "./fileUploader/Uploader";
import { Element } from "../utility/Element";
import { SVGfile } from "./file/SVGFile";
import { FileDivElements } from "./file/FileDivElements";
import { FilesStyle } from "./file/FilesStyle";
import { UploaderStyle } from "./fileUploader/UploaderStyle";
import { EventListener } from "../eventListener/eventListener";



export class FileList {
    files = [];
    parentElement;
    fileBox;
    uploadButtonBox;
    analyzer;
    style;

    constructor(ParentElement) {
        this.parentElement = ParentElement;

        this.style = new FilesStyle();
        this.style2 = new UploaderStyle();
        this.event = new EventListener();
        this.event.add("svgFileAdded");//fileが追加されたら発火、現在のfileのlengthを渡す

        //wrapperを作る
        this.fileBox = new Element(this.parentElement, "id", "fileBox", "div");
        this.uploadButtonBox = new Element(this.parentElement, "id", "uploadButtonBox", "div");
        this.uploader = new Uploader("uploadButtonBox", "uploader");//inputElementを作成する
        this.inputButton = new SvgButton("#uploader_inputElement");//inputElementのイベントリスナーを生成

        this.inputButton.addEventListener('svgLoaded', (event) => {
            this.analyzer = new SvgCircleAnalyzer(event);
            //ここでfileListにデータを保存する
            let fileName = this.inputButton.svgLoader.rawData.name;
            this.files.push({
                svgDate: new SVGfile(this.analyzer.getArray()),
                div: new FileDivElements(this.fileBox.getDOMElement(), fileName)
            });
            this.event.dispatch("svgFileAdded", this.files.length);
        });
    }

    getFilesLength() {
        return this.files.length;
    }
    getSvgData(i) {
        return this.files[i].svgData.getArray();
    }
}

