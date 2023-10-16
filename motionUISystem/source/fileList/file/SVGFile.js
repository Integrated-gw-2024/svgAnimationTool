export class SVGfile {
    svgArray;
    fileName;

    constructor(svgArray, FileName) {
        this.svgArray = svgArray;
        this.fileName = FileName;
    }

    getArray() {
        return this.svgArray;
    }
    getName(){
        return this,fileName;
    }
}
