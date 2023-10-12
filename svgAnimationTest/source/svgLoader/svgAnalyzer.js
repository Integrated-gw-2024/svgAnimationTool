
/**
   * svgElementsから位置情報や大きさなどを取り出すクラス。
   * @param {svgElements} svgElements -svgLoaderクラスで取り出したsvgElementsを入れてください。
   * @param {center | left} svgElements -座標の読み込み基準を決められます。
   */
export class SvgCircleAnalyzer {
  svgElements;
  svgCircleElements;
  svgViewBoxSize;

  circles;

  constructor(svgElements, mode = 'left') {
    if (mode != 'center' && mode != 'left') {
      throw new Error('ReferenceModeに渡された値が不正です。centerもしくはleftを渡してください');
    }

    this.svgElements = svgElements

    const viewBoxValues = this.svgElements.getAttribute('viewBox').split(' ').map((param) => +param);
    this.svgViewSize = {
      width: viewBoxValues[2],
      height: viewBoxValues[3],
    }

    this.circles = [];
    const circleElements = this.svgElements.querySelectorAll('circle');
    for(const circleElement of circleElements) {
      let circle = {
        position: {
          x: null,
          y: null,
        },
        radius: null,
        fill: null,
        strokeColor: null,
        strokeWeight: null,
      }

      switch (mode) {
        case 'left':
          circle.position.x = parseFloat(circleElement.getAttribute('cx'));
          circle.position.y = parseFloat(circleElement.getAttribute('cy'));
          break;
        case 'center':
          circle.position.x = parseFloat(circleElement.getAttribute('cx') - this.svgViewSize.width / 2);
          circle.position.y = parseFloat(circleElement.getAttribute('cy') - this.svgViewSize.height / 2);
          break;
      }

      circle.radius = parseFloat(circleElement.getAttribute('r'));
      circle.fill = circleElement.getAttribute('fill'); //数値に直す必要がないので注意
      circle.strokeColor = circleElement.getAttribute('stroke');
      circle.strokeWeight = parseFloat(circleElement.getAttribute('stroke-width'));

      this.circles.push(circle);
    }
  }

  /**
   * 読み込んだcirclesの配列の長さを取得する。
   */
  getLength() {
    return this.circles.length;
  }

  /**
   * 読み込んだsvgファイルのキャンパスサイズを取得する。
   */
  getViewSize() {
      return this.svgViewSize;
  }

  /**
   * 特定のcircleの情報だけを取得する。
   */
  getCircleElement(i) {
      return this.circles[i];
  }

  /**
   * 読み込んだsvgの情報を配列として書き出すことができる。
   */
  getArray() {
      return this.circles;
  }
}
