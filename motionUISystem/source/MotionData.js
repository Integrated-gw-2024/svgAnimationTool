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
        this.name = Name;
        this.startSvgData = StartSvgData;
        this.endSvgData = EndSvgData;
        this.startFrame = StartFrame;
        this.endFrame = EndFrame;
        this.motionType = MotionType;
        this.setInitMotionPARAMS();
    }

    setInitMotionPARAMS() {
        this.motionPARAMS = {
            randomWalk_Range: 0,
        }
    }
    get motionPARAMS(){
        return this.motionPARAMS;
    }
    get data(){
        let data = {
            name: this.name,
            startSvgData: this.startSvgData,
            endSvgData: this.endSvgData,
            startFrame: this.startFrame,
            endFrame: this.endFrame,
            motionType: this.motionType,
            motionPARAMS: this.motionPARAMS,
        }
        return data;
    }

    set data(MotionArray) {
        this.startFrame = MotionArray.startFrame;
        this.endFrame = MotionArray.endFrame;
        this.motionType = MotionArray.startSvgData;
        console.log("新しい値にmotionDataを更新したよ");
    }
}