import { Shape } from "./shape";
import { TimelineParameter } from "../motions/timelineParameter";

export class Circle extends Shape {
  #originalRadius;
  #radius;

  constructor(radius = 10) {
    super();
    this.#originalRadius = radius;
    this.timeline = {
      radius: new TimelineParameter(this, 'radius')
    };
  }

  setup(p5, systems) {
    super.setup(p5, systems)
    this.resizeFix();

    this.systems.event.canvas.add('resize', () => {
      this.resizeFix();
    }, this)
  }

  resizeFix() {
    this.#radius = this.#originalRadius * this.systems.canvas.scaleCanvasSize;
  }

  display() {
    this.p5.circle(this.components.position.x, this.components.position.y, this.#radius);
  }

  dispose() {
    this.systems.event.canvas.remove('resize', this);
  }

  get radius() {
    return this.#radius;
  }

  set radius(radius)  {
    this.#originalRadius = radius;
    if (this.systems != null) {
      this.#radius = this.#originalRadius * this.systems.canvas.scaleCanvasSize;
    }
  }

  get originalRadius() {
    return this.#originalRadius;
  }
}