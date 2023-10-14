import { MotionManager } from "./MotionManager";
import { ControlManager } from "./ControlManager";
import { EventListener } from "./eventListener/eventListener";

let motionManager;
let controlManager;

window.onload = createUploadButton;
function createUploadButton() {

    motionManager = new MotionManager();
    controlManager = new ControlManager();

    motionManager.updateMotionData(0, motionArray);
    console.log(motionManager.getMotionData(0));
    console.log(motionManager.event);
}

