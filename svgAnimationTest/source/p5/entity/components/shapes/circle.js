import { Shape } from "./shape";
import { Timeline } from "../motions/timeLine";

export class Circle extends Shape {
  #originalRadius;
  #radius;

  constructor(radius = 10) {
    super();
    this.#originalRadius = radius;
    this.timeline = {
      radius: new Timeline(this, 'radius')
    };
  }

  setup(p5, systems, components) {
    super.setup(p5, systems, components)
    this.resizeFix();

    this._systems.event.canvas.add('resize', () => {
      this.resizeFix();
    })
  }

  resizeFix() {
    this.#radius = this.#originalRadius * this._systems.canvas.canvasWithFullHD;
  }

  display() {
    this._p5.circle(this._components.position.x, this._components.position.y, this.#radius);
  }

  get radius() {
    return this.#radius;
  }

  set radius(radius)  {
    this.#originalRadius = radius;
    if (this._systems != null) {
      this.#radius = this.#originalRadius * this._systems.canvas.canvasWithFullHD;
    }
  }
}