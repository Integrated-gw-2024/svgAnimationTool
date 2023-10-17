import { System } from "./system"

export class TimelineSystem extends System {
  globalFrame;

  constructor() {
    super('timeline');
  }

  setup(p5, systemsEvent) {
    super.setup(p5, systemsEvent);
    this.systemsEvent.timeline.add('setMotionParameter');
  }

  update() {
    this.globalFrame.update();
  }

  setMotionParameter(motionIndex, whole, easing) {
    this.systemsEvent.timeline.dispatch('setMotionParameter', motionIndex, whole, easing);
  }

  reset() {
    this.systemsEvent.timeline.dispatch('reset');
  }
}