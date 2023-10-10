import { FileList } from "./FileList";


let fileList;
window.onload = createUploadButton;

function createUploadButton() {
    fileList = new FileList("fileList");
}

