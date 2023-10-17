import { MotionManager } from "./MotionManager";
import { ControlManager } from "./ControlManager";
import { FileList } from "./fileList/FileList";

window.onload = motionUiSystem;

let motionManager;
let controlManager;
let fileList;

function motionUiSystem() {
    motionManager = new MotionManager();
    controlManager = new ControlManager();
    fileList = new FileList("fileList");

    fileList.event.add("svgFileAdded",(svgFileLength) => {
        if(svgFileLength == 1){
            console.log("1個あげたよ");
        }
        //fileListでsvgデータが二つアップロードされたら
        if(svgFileLength == 2){
            let startSvgData = fileList.getSvgData(0);//ここでsvgデータを取得している
            let endSvgData = fileList.getSvgData(1);//ここでsvgデータを取得している
            //motionDataを追加
            motionManager.addMotionData(`${startSvgData.fileName} → ${endSvgData.fileName}`,startSvgData.svgArray , endSvgData.svgArray, 0,100,"");
        }
    });
    //motionDataが変更された時に発火する
    motionManager.event.add("dataUpdated", (updatedMotionDataNum, PARAMS) =>{
        //渡されているupdatedMotionDataNumは変更されたmotionDataの配列
        //PARAMSはそのmotionDataのもつデータが詰まっている
    });
    //motionDataが追加されたとき
    motionManager.event.add("motionAdded", (NewPARAMS) => {//ここのNewPARAMSは初期化した状態のnullが混ざっているので注意
        //timelineにmotionObjectを配置
        controlManager.addMotionObject(NewPARAMS.name);
    });
    //motionObjectが選択された時
    controlManager.event.add("motionObjectSelected", (selectedMotionObjectData) => {
        console.log("現在は " + selectedMotionObjectData + " 個目のmotionObjectを選択中");
    });

    /*ここから下はUI同士の連絡とかそういうものなので無視していいよ*/
    //motionObjectが追加し終わったら
    controlManager.event.add("motionObjectAdded", (NewPARAMS, CurrentMotionObjectNum) => {
        //motionDataにデータを更新
        motionManager.updateMotionData(NewPARAMS, CurrentMotionObjectNum);
    });
    //UIによってパラメーターが変化した時
    controlManager.event.add("parameterChanged",(SelectedData,PARAMS) =>{
        //motionDataを変更する
        motionManager.updateMotionData(PARAMS, SelectedData);
    });
}

