export function loadElement(canvas) {
    let element = null;
    if (typeof canvas == "string") {
        element = document.querySelector(canvas);
    }
    else if (canvas instanceof HTMLElement) {
        element = canvas;
    }
    if (element === null) {
        throw new Error("Elementを取得できませんでした。");
    }
    return element;
}
