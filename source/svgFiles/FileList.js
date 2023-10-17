//svgFileListは画面右のあのリストのことを言っているよ
//fileはsvgFileとdivの二つで構成されているよ
//divにはスタイルをつける用のクラスがあるよ

import { SvgButton } from "./svgLoader";
import { SvgCircleAnalyzer } from "./svgLoader";
import { Uploader } from "./fileUploader/Uploader";
import { Element } from "./Element";
import { SVGfile } from "./file/SVGFile";
import { FileDivElements } from "./file/FileDivElements";
import { FilesStyle } from "./file/FilesStyle";
import { UploaderStyle } from "./fileUploader/UploaderStyle";



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
                svgData: new SVGfile(this.analyzer.getArray()),
                div: new FileDivElements(this.fileBox.getDOMElement(), fileName)
            });
        });
    }

    getFilesLength() {
        return this.files.length;
    }
    getSvgData(i) {
        return this.files[i].svgData.getArray();
    }
}

