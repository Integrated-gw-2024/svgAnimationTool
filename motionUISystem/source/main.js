import { MotionManager } from "./MotionManager";
import { ControlManager } from "./ControlManager";
import { FileList } from "./fileList/FileList";
import { EventListener } from "./eventListener/eventListener";

window.onload = motionUiSystem;

let motionManager;
let controlManager;
let fileList;

function motionUiSystem() {
    motionManager = new MotionManager();
    controlManager = new ControlManager();
    fileList = new FileList("fileList");

    //fileListでsvgデータが二つアップロードされたら
    fileList.event.add("svgFileAdded",(svgFileLength) => {
        if(svgFileLength == 2){
            let startSvgData = fileList.getSvgData(0);
            console.log(startSvgData);
            let endSvgData = fileList.getSvgData(1);
            console.log(endSvgData);
            //motionDataを追加
            motionManager.addMotionData(`${startSvgData.fileName} → ${endSvgData.fileName}`,startSvgData.svgArray , endSvgData.svgArray, 0,100,"");
        }
    });
    //motionDataが変更された時に発火する
    motionManager.event.add("dataUpdated", (updatedMotionObjectNum, PARAMS ) =>{
        //渡されているupdatedMotionObjectNumは変更されたmotionDataの配列
        //PARAMSはそのmotionDataのもつデータが詰まっている

    });
    //motionDataが追加されたとき
    motionManager.event.add("motionAdded", (NewPARAMS) => {
        //timelineにmotionObjectを配置
        controlManager.addMotionObject(NewPARAMS.name);
    });
    //motionObjectが追加し終わったら
    controlManager.event.add("motionObjectAdded", (newPARAMS, CurrentMotionObjectNum) => {
        //motionDataにデータを更新
        motionManager.updateMotionData(newPARAMS, CurrentMotionObjectNum);
    });
    //UIによってパラメーターが変化した時
    controlManager.event.add("parameterChanged",(SelectedData,PARAMS) =>{
        //motionDataを変更する
        motionManager.updateMotionData(PARAMS, SelectedData);
    });
    //motionObjectが選択された時
    controlManager.event.add("motionObjectSelected", (selectedMotionObjectData) => {
        console.log("現在は " + selectedMotionObjectData + " 個目のmotionObjectを選択中");
    });
}

