import { MotionManager } from "./MotionManager";
import { ControlManager } from "./ControlManager";
import { TweakPaneManager } from "./tweakPane/TweakPaneManager";
import { EventListener } from "./eventListener/eventListener";

let motionManager;
let controlManager;
let tweakPaneManager;

window.onload = createUploadButton;
function createUploadButton() {
    console.log("ok");
    motionManager = new MotionManager();
    controlManager = new ControlManager();
    tweakPaneManager = new TweakPaneManager();

    console.log(motionManager.getMotionData(0));
    console.log(motionManager.event);

    
    tweakPaneManager.event.add("PARAMSInteracted", (PARAMS) => {
    });
    controlManager.event.add("motionObjectSelected", (selectedMotionObjectData) => {
        console.log(selectedMotionObjectData);
    });


    let data = {
        name: "aiuaiaiu",
        startFrame: 10010,
        endFrame: 109109,
    }
    motionManager.updateMotionData(data, 0);
}

