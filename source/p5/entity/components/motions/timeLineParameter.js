export class TimelineParameter {
  #component;
  #reflectKey;

  #systems;
  #components;

  #motions;
  #indexCurrent;
  indexShift;
  loopMode;

  constructor(component, reflectKey) {
    this.#component = component;
    this.#reflectKey = reflectKey;

    this.#motions = [];
    this.#indexCurrent = 0;

    this.indexShift = 0;
    this.loopMode = false;
  }

  setup(systems) {
    this.#systems = systems;
  }

  setupComponents(components) {
    this.#components = components;
    this.#components.event.timeline.add(
      'setMotionParameter',
      (motionIndex, whole, easing) => {
        if (motionIndex >= this.#motions.length) return;
        if (whole != undefined) {
          this.#motions[motionIndex + this.indexShift].whole = whole;
        }
        if (easing != undefined) {
          this.#motions[motionIndex + this.indexShift].tween.easing = easing;
        }
      },
      this
    );

    this.#components.event.timeline.add(
      'reset',
      () => {
        this.reset();
      },
      this
    );

    this.#components.event.timeline.once(
      'remove',
      () => {
        this.dispose();
      },
      this
    );
  }

  addMotion(motion) {
    motion.setup(this.#component, this.#reflectKey);
    this.#motions.push(motion);
  }

  update() {
    if (this.#motions.length <= 0) return;
    if (this.#indexCurrent >= this.#motions.length) return;
    if (this.#motions[this.#indexCurrent].isComplete()) this.#indexCurrent++;
    if (this.#indexCurrent >= this.#motions.length) {
      if (this.loopMode == true) this.reset();
      return
    }

    this.#motions[this.#indexCurrent].update();
  }

  dispose() {
    this.#components.event.timeline.remove('setMotionParameter', this);
    this.#components.event.timeline.remove('reset', this);
  }

  reset() {
    this.#indexCurrent = 0;
    for (const motion of this.#motions) {
      motion.reset();
    }
  }
}
