/**
   * svgElementを読み込むクラス。
   * @param {HTMLInputElement} TargetFile -inputから受け取ったデータを入力(event.target.files[0]);
   */
export class SvgLoader {
  rawData;
  url;
  svgElements;

  constructor(TargetFile = null) {
    this.rawData = TargetFile;
    this.url = URL.createObjectURL(this.rawData);

    this.loadSVG();
  }

  loadSVG() {
    if(this.rawData == null) {
      throw new Error('rawDataの値が入力されていません。')
    }

    this.svgElements = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(this.url);
        const data = await response.text();
        const parser = new DOMParser(); // DOMParserを作成
        const svgDoc = parser.parseFromString(data, 'image/svg+xml'); // SVGデータを解析
        resolve(svgDoc.querySelector('svg'));
      } catch (error) {
        console.error(error);
        reject(error);
      }
    })
  }
}
