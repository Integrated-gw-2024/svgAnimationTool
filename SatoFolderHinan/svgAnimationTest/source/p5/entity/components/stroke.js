import { Component } from "./component";
import { Timeline } from "./motions/timeLine";

export class Stroke extends Component {
  #originalWeight;
  #weight;
  color;
  timeline;

  constructor(strokeWeight = 0, strokeColor = '#FFFFFF') {
    super('stroke');
    this.#originalWeight = strokeWeight;
    this.color = strokeColor
    this.timeline = {
      weight: new Timeline(this, 'weight'),
      color: new Timeline(this, 'color'),
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
    this.#weight = this.#originalWeight * this._systems.canvas.canvasWithFullHD;
  }

  display() {
    if(this.#weight == 0) {
      this._p5.noStroke();
    } else {
      this._p5.strokeWeight(this.#weight);
      this._p5.stroke(this.color);
    }
  }

  update() {
    super.update();
  }

  get weight() {
    return this.#weight;
  }

  set weight(strokeWeight)  {
    this.#originalWeight = strokeWeight;
    if (this._systems != null) {
      this.#weight = this.#originalWeight * this._systems.canvas.canvasWithFullHD;
    }
  }
}