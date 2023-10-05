let buttonBox;

window.onload = createUploadButton;

function createUploadButton() {
    buttonBox = new UploadButtonManager("buttonBox", "200px");
}