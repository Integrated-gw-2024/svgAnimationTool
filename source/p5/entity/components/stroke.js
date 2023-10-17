import { Component } from "./component";
import { TimelineParameter } from "./motions/timelineParameter";

export class Stroke extends Component {
  #originalWeight;
  #weight;
  color;

  constructor(strokeWeight = 0, strokeColor = '#FFFFFF') {
    super('stroke');
    this.#originalWeight = strokeWeight;
    this.color = strokeColor
    this.timeline = {
      weight: new TimelineParameter(this, 'weight'),
      color: new TimelineParameter(this, 'color'),
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
    this.#weight = this.#originalWeight * this.systems.canvas.scaleCanvasSize;
  }

  display() {
    if(this.#weight == 0) {
      this.p5.noStroke();
    } else {
      this.p5.strokeWeight(this.#weight);
      this.p5.stroke(this.color);
    }
  }

  dispose() {
    this.systems.event.canvas.remove('resize', this);
  }

  get weight() {
    return this.#weight;
  }

  set weight(strokeWeight)  {
    this.#originalWeight = strokeWeight;
    if (this.systems != null) {
      this.#weight = this.#originalWeight * this.systems.canvas.scaleCanvasSize;
    }
  }
}