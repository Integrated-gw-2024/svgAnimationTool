import { MotionData } from "./MotionData";
import { EventListener } from "./eventListener/eventListener";


//このクラスは、motionのDataに関して管理するクラス

export class MotionManager{
    motionData = [];

    constructor(){
        //イベントリスナーを設定
        this.event = new EventListener();
        this.event.add("dataUpdated");//データの更新が反映された時に発火
        this.event.add("motionAdded");//motionDataが追加された時に発火
    }

    //motionDataを追加する
    addMotionData(Name, StartSvgData, endSvgData, StartFrame, EndFrame, MotionType){
        this.motionData.push(new MotionData(Name, StartSvgData, endSvgData, StartFrame, EndFrame, MotionType));
        this.event.dispatch("motionAdded", this.motionData[this.motionData.length -1].data);
    }

    //motionDataを更新する
    updateMotionData(newData, MotionNum){
        this.motionData[MotionNum].data = newData;//今選択中のmotionDataの_dataを変更する
        this.event.dispatch("dataUpdated");
    }

    //motionDataを取得する
    getMotionData(MotionNum){
        return this.motionData[MotionNum].data;
    }


}