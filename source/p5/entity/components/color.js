import { Component } from "./component";
import { TimelineParameter } from "./motions/timelineParameter";

export class Color extends Component {
  colorCode;

  constructor(colorCode = '#FFFFFF') {
    super('color');
    this.colorCode = colorCode;
    this.timeline = {
      colorCode: new TimelineParameter(this, 'colorCode')
    };
  }

  display() {
    
    if(this.colorCode == undefined) {
      this.colorCode = '#ff8fdd'
    }
    this.p5.fill(this.colorCode);
  }
}