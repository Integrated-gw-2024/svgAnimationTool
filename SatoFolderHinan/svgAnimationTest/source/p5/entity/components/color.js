import { Component } from "./component";
import { Timeline } from "./motions/timeLine";

export class Color extends Component {
  colorCode;

  constructor(colorCode = '#FFFFFF') {
    super('color');
    this.colorCode = colorCode;
    this.timeline = {
      colorCode: new Timeline(this, 'colorCode')
    };
  }

  setup(p5, systems, components) {
    super.setup(p5, systems, components)
  }

  display() {
    this._p5.fill(this.colorCode);
  }

  update() {
    super.update();
  }
}