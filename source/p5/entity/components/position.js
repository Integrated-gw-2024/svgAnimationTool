import { Component } from "./component";
import { TimelineParameter } from "./motions/timelineParameter";

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
      x: new TimelineParameter(this, 'x'),
      y: new TimelineParameter(this, 'y'),
    }
  }

  setup(p5, systems) {
    super.setup(p5, systems)
    this.resizeFix();

    this.systems.event.canvas.add('resize', () => {
      this.resizeFix();
    }, this)
  }

  resizeFix() {
    this.#x = this.#originalX * this.systems.canvas.scaleCanvasSize;
    this.#y = this.#originalY * this.systems.canvas.scaleCanvasSize;
  }

  dispose() {
    this.systems.event.canvas.remove('resize', this);
  }

  get x() {
    return this.#x;
  }

  set x(x)  {
    this.#originalX = x;
    if (this.systems != null) {
      this.#x = this.#originalX * this.systems.canvas.scaleCanvasSize;
    }
  }

  get y() {
    return this.#y;
  }

  set y(y)  {
    this.#originalY = y;
    if (this.systems != null) {
      this.#y = this.#originalY * this.systems.canvas.scaleCanvasSize;
    }
  }

  get originalX() {
    return this.#originalX;
  }

  get originalY() {
    return this.#originalY;
  }
}
