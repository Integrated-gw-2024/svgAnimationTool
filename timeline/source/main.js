import { FileList } from "./FileList";
import { Timeline } from "./Timeline";


let fileList;
let timeline;

window.onload = createUploadButton;

function createUploadButton() {
    console.log("ooo");
    fileList = new FileList("fileList");
    timeline = new Timeline("timeline");

    document.addEventListener("click", () => {
        timeline.pushMotionObject();
    });
    document.addEventListener("keypress", () => {
        console.log(timeline.getSelectedObjectNumber());
        console.log(timeline.getMotionObjectFrames(0));
    });
}

