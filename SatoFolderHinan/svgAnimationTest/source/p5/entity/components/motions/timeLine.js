export class Timeline {
  #component;
  #reflectKey;

  #motions;
  #motionsIndexCurrent;

  constructor(component, reflectKey) {
    this.#component = component;
    this.#reflectKey = reflectKey;

    this.#motions = [];
    this.#motionsIndexCurrent = 0;
  }

  addMotion(motion) {
    motion.setup(this.#component, this.#reflectKey);
    this.#motions.push(motion);
  }

  reset() {
    for (const motion of this.#motions) {
      motion.reset();
    }

    this.motionsIndexCurrent = 0;
  }

  update() {
    if (this.#motions.length <= 0) return;

    if (this.#motions[this.#motionsIndexCurrent].isComplete()) {
      this.#motionsIndexCurrent++;
    }

    if (this.#motionsIndexCurrent >= this.#motions.length) {
      this.#motionsIndexCurrent = 0;
      this.reset();
    }

    this.#motions[this.#motionsIndexCurrent].update();
  }

  get motions() {
    return this.#motions;
  }
}