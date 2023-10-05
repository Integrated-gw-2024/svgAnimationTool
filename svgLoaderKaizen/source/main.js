import { SvgButton } from "./svgLoader";
import { SvgCircleAnalyzer } from "./svgLoader";

let inputButton;

document.addEventListener("DOMContentLoaded", setup);

function setup() {
  inputButton = new SvgButton("#fileInput"); //document.querySelector("#fileInput")でも可
  inputButton.addEventListener('change', () => {
    console.log('アップロード成功');
  })

  inputButton.addEventListener('svgLoaded', (event) => {
    //console.log(event);
    const apple = new SvgCircleAnalyzer(event);
    console.log('svgLoaded');
    console.log(apple.circles[0]);
  })
}