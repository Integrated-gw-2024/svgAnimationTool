import { Component } from "./component";
import { Timeline } from "./motions/timeLine";

export class Position extends Component {
  #originalX;
  #originalY;
  #x;
  #y;

  constructor(x = 0, y = 0) {
    super('position');
    this.#originalX = x;
    this.#originalY = y;
    this.timeline = {
      x: new Timeline(this, 'x'),
      y: new Timeline(this, 'y'),
    }
  }

  setup(p5, systems, components) {
    super.setup(p5, systems, components)
    this.resizeFix();

    this._systems.event.canvas.add('resize', () => {
      this.resizeFix();
    })
  }

  resizeFix() {
    this.#x = this.#originalX * this._systems.canvas.canvasWithFullHD;
    this.#y = this.#originalY * this._systems.canvas.canvasWithFullHD;
  }

  update() {
    super.update();
  }

  get x() {
    return this.#x;
  }

  set x(x)  {
    this.#originalX = x;
    if (this._systems != null) {
      this.#x = this.#originalX * this._systems.canvas.canvasWithFullHD;
    }
  }

  get y() {
    return this.#y;
  }

  set y(y)  {
    this.#originalY = y;
    if (this._systems != null) {
      this.#y = this.#originalY * this._systems.canvas.canvasWithFullHD;
    }
  }
}