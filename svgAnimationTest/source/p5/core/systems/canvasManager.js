import { System } from "./system";

export class CanvasManager extends System {
  canvas;
  components;

  waitUpdateMillis;
  #adjustSizeElement;

  canvasWithFullHD;

  #queue;

  constructor(htmlElement = document.body, millis = 200) {
    super("canvas");
    this.#adjustSizeElement = htmlElement;
    this.waitMillis = millis;

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

    this._systemsEvent.canvas.add('resize');

    this._p5.createCanvas();
    this.resize();
  }

  resize() {
    this._p5.resizeCanvas(this.#adjustSizeElement.clientWidth, this.#adjustSizeElement.clientHeight);
    this.canvasWithFullHD = this.#adjustSizeElement.clientWidth / 1920;

    this._systemsEvent.canvas.dispatch('resize');
  }

  set adjustSizeElement(htmlElement) {
    this.#adjustSizeElement = htmlElement;
    this.resize();
  }

  get adjustSizeElement() {
    return this.#adjustSizeElement;
  }
}
