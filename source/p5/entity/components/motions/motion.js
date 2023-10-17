export class Motion {
  #component;
  #reflectKey;

  #motionTimeline;

  constructor(whole) {
    this.#motionTimeline = {
      current: 0,
      whole: whole,
    }
  }

  setup(component, reflectKey) {
    this.#component = component;
    this.#reflectKey = reflectKey;
  }

  isComplete() {
    if (this.#motionTimeline.current >= this.#motionTimeline.whole) return true;
    return false;
  }

  reset() {
    this.#motionTimeline.current = 0;
  }

  update() {};

  get component() {
    return this.#component;
  }

  get reflectKey() {
    return this.#reflectKey;
  }

  get motionTimeline() {
    return this.#motionTimeline;
  }
}
