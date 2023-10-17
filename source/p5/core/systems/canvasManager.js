import { System } from "./system";

export class CanvasManager extends System {
  #canvas;

  #adjustSizeElement;
  #ratio;
  originalViewWidth;
  #scaleCanvasSize;

  #queue

  constructor(htmlElement = document.body, width = 16, height = 9, millis = 200) {
    super("canvas");
    this.#adjustSizeElement = htmlElement;
    this.waitMillis = millis;

    this.originalViewWidth = 1920;

    this.#ratio = {
      width: width,
      height: height,
    };

    window.addEventListener(
      "resize",
      () => {
        clearTimeout(this.#queue);
        this.#queue = setTimeout(this.resize.bind(this), this.waitMillis);
      },
      false
    );
  }

  setup(p5, systemsEvent) {
    super.setup(p5, systemsEvent);

    this.systemsEvent.canvas.add("resize");

    this.p5.createCanvas();
    this.#canvas = document.querySelector('#defaultCanvas0');

    this.resize();
  }

  resize() {
    const elementRatio = this.#adjustSizeElement.clientWidth / this.#adjustSizeElement.clientHeight;

    if (this.#ratio.width / this.#ratio.height < elementRatio) {
      this.p5.resizeCanvas(
        (this.#adjustSizeElement.clientHeight / this.#ratio.height) * this.#ratio.width,
        this.#adjustSizeElement.clientHeight
      );
    } else if (this.#ratio.width / this.#ratio.height > elementRatio) {
      this.p5.resizeCanvas(
        this.#adjustSizeElement.clientWidth,
        (this.#adjustSizeElement.clientWidth / this.#ratio.width) * this.#ratio.height
      );
    } else {
      this.p5.resizeCanvas(
        this.#adjustSizeElement.clientHeight,
        this.#adjustSizeElement.clientHeight
      );
    }

    this.#scaleCanvasSize = this.#canvas.clientWidth / this.originalViewWidth;

    this.systemsEvent.canvas.dispatch("resize");
  }

  set adjustSizeElement(htmlElement) {
    this.#adjustSizeElement = htmlElement;
    this.resize();
  }

  get adjustSizeElement() {
    return this.#adjustSizeElement;
  }

  set ratio({ width = 16, height = 9 }) {
    this.#ratio = {
      width: width,
      height: height,
    }

    this.resize();
  }

  get ratio() {
    return this.#ratio;
  }

  get scaleCanvasSize() {
    return this.#scaleCanvasSize;
  }
}