import { MotionManager } from "./MotionManager";
import { ControlManager } from "./ControlManager";

let motionManager;
let controlManager;

window.onload = createUploadButton;
function createUploadButton() {
    console.log("ok");
    motionManager = new MotionManager();
    controlManager = new ControlManager();

    controlManager.event.add("motionObjectSelected", (selectedMotionObjectData) => {
        console.log(selectedMotionObjectData);
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

