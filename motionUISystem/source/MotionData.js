//モーションの本体で、ここにデータが詰まっている

export class MotionData {
    name;
    startSvgData;
    endSvgData;
    startFrame;
    endFrame;
    duration;
    motionType;
    motionPARAMS = {};

    constructor(Name, StartSvgData, EndSvgData, StartFrame, EndFrame, MotionType) {
        //初期化
        this._data = {
            name: Name,
            startSvgData: StartSvgData,
            endSvgData: EndSvgData,
            startFrame: StartFrame,
            endFrame: EndFrame,
            duration: EndFrame - 1 - StartFrame,
            motionType: MotionType,
            motionPARAMS: {
                randomWalk_Range: 0,
            }
        }
    }

    get motionPARAMS(){
        return this._data.motionPARAMS;
    }
    get data(){
        return this._data;
    }

    set data(newData) {
        for (let key in this._data) {//for...inでデータを順番に処理している
            if (newData.hasOwnProperty(key)) {//newDataにプロパティが設定してあれば
                console.log(`${this._data.name}の${key} を ` + this._data[key] + " から " + newData[key] + " に更新しましす");
                this._data[key] = newData[key];//そのプロパティを更新する
            }
        }
    }
}