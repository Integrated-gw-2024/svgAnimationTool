//このクラスは、svgファイルをJavaScriptで操作可能なファーマットにするための変換の機能を持っています。

class SvgLoader {

    //TargetFileに取得したsvgファイルをそのまま渡してください。パスではダメ。
    //ReferenceModeにはLEFTとCENTERを渡してください。座標の読み込み基準を決められます。

    constructor(TargetFile, ReferenceMode) {
        this.rawData = TargetFile;
        this.mode = ReferenceMode;
        this.debugMode = false;

        //ReferenceModeのエラー処理
        if (this.mode != LEFT && this.mode != CENTER) {
            throw new Error('ReferenceModeに渡された値が不正です。CENTERもしくはLEFTを渡してください');
        }

        this.url = URL.createObjectURL(this.rawData);//ここでurlを発行している
        this.svgViewSize;//svgのファイルの大きさ
        this.circles = [];//ここに丸のデータが全て入っている

        if (this.debugMode) { console.log(this.rawData.name + "の解析を開始します。"); }
        this.analyzeSVG();//解析を実行
    }


    //読み込んだcirclesの配列の長さを取得する
    getLength() {
        return this.circles.length;
    }

    //読み込んだsvgファイルのキャンパスサイズを取得する
    getViewSize() {
        return this.svgViewSize;
    }

    //特定のcircleの情報だけを取得する
    getCircleElement(i) {
        return this.circles[i];
    }

    //読み込んだsvgの情報を配列として書き出すことができる
    getArray() {
        return this.circles;
    }

    async analyzeSVG() {
        try {
            let response = await fetch(this.url);
            let data = await response.text();
            let parser = new DOMParser(); // DOMParserを作成
            let svgDoc = parser.parseFromString(data, 'image/svg+xml'); // SVGデータを解析
            let svgElement = svgDoc.querySelector('svg');
            let circleElements = svgElement.querySelectorAll('circle'); // 解析したSVGからすべての円を選択

            let viewBoxValue = svgElement.getAttribute('viewBox').split(' ').map((param) => +param);//ここでviewBoxの値を配列として読み込んでいる
            this.svgViewSize = {
                width: viewBoxValue[2],
                height: viewBoxValue[3]
            };

            // 各円要素の属性を取得し、配列に保存
            for (let circleElement of circleElements) {

                let x;
                let y;
                if (this.mode == LEFT) {
                    x = parseFloat(circleElement.getAttribute('cx'));
                    y = parseFloat(circleElement.getAttribute('cy'));
                }
                else if (this.mode == CENTER) {
                    //座標の指定の基準を左上ではなく、中央に設定している
                    x = parseFloat(circleElement.getAttribute('cx')) - this.svgViewSize.width / 2;
                    y = parseFloat(circleElement.getAttribute('cy') - this.svgViewSize.height / 2);
                }

                let r = parseFloat(circleElement.getAttribute('r'));
                let fill = circleElement.getAttribute('fill');//数値に直す必要がないので注意
                let strokeColor = circleElement.getAttribute('stroke');
                let strokeWeight = parseFloat(circleElement.getAttribute('stroke-width'));
                this.circles.push({ x, y, r, fill, strokeColor, strokeWeight }); // 取得した座標と半径を配列に追加
            }
        } catch (error) {
            console.error(error); // エラーが発生した場合にログを出力
        }
        if (this.debugMode) {
            console.log("解析が完了しました。circle配列には、x,y,r,fill,strokeColor,strokeWeightのプロパティが含まれています。");
            console.log("また、svgキャンパスの解像度はthis.svgViewSizeに格納されています。");
        }
    }
}