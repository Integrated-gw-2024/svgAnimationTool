import { MotionManager } from "./MotionManager";
import { ControlManager } from "./ControlManager";
import { FileList } from "./fileList/FileList";

let motionManager;
let controlManager;
let fileList;

window.onload = main;
function main() {
    motionManager = new MotionManager();
    controlManager = new ControlManager();
    fileList = new FileList("fileList");


    fileList.event.add("svgFileAdded",(svgFileLength) => {
        console.log(svgFileLength);
        if(svgFileLength == 2){
            let startSvgData = fileList.getSvgData(0);
            console.log(startSvgData);
            let endSvgData = fileList.getSvgData(1);
            console.log(endSvgData);
            motionManager.addMotionData(`${startSvgData.fileName} → ${endSvgData.fileName}`,startSvgData.svgArray , endSvgData.svgArray, 0,100,"");
        }
    });
    controlManager.event.add("motionObjectSelected", (selectedMotionObjectData) => {
        // console.log(selectedMotionObjectData);
    });
    controlManager.event.add("parameterChanged",(SelectedData,PARAMS) =>{
        motionManager.updateMotionData(PARAMS, SelectedData);
    });

    motionManager.event.add("motionAdded", (NewPARAMS) => {
        controlManager.addMotionObject();
    });
    controlManager.event.add("motionObjectAdded", (newPARAMS, CurrentMotionObjectNum) => {
        motionManager.updateMotionData(newPARAMS, CurrentMotionObjectNum);
    });

}

