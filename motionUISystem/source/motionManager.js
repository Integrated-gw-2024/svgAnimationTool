import { MotionData } from "./MotionData";
import { EventListener } from "./eventListener/eventListener";

export class MotionManager{
    motionData = [];

    constructor(){
        //イベントリスナーを設定
        this.event = new EventListener();
        this.event.add("dataUpdated");
        this.event.add("motionAdded");

        this.addMotionData("test", "data1", "data2", 0,10,"testMotion");
    }

    //motionDataを追加する
    addMotionData(Name, StartSvgData, endSvgData, StartFrame, EndFrame, MotionType){
        this.motionData.push(new MotionData(Name, StartSvgData, endSvgData, StartFrame, EndFrame, MotionType));
        this.event.dispatch("motionAdded");
    }

    //motionDataを更新する
    updateMotionData(MotionNum, MotionArray){
        this.motionData[MotionNum].data = MotionArray;
        this.event.dispatch("dataUpdated");
    }

    //motionDataを取得する
    getMotionData(MotionNum){
        return this.motionData[MotionNum].data;
    }
}