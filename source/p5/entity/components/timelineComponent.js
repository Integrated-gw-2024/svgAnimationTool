import { Component } from "./component";

export class TimelineComponent extends Component {
  constructor() {
    super('timeline');
  }

  setup(p5, systems) {
    super.setup(p5, systems);
    this.systems.event.timeline.add('setMotionParameter', (motionIndex, whole, easing) => {
      this.setMotionParameter(motionIndex, whole, easing);
    }, this)

    this.systems.event.timeline.add('reset', () => {
      this.reset();
    }, this)
  }
  
  setMotionParameter(motionIndex, whole, easing) {
    this.components.event.timeline.dispatch('setMotionParameter', motionIndex, whole, easing)
  }

  reset() {
    this.components.event.timeline.dispatch('reset');
  }
}