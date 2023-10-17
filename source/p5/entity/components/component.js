export class Component {
  #p5;
  #systems;
  #components;

  #registryKey

  timeline;

  constructor(name) {
    this.#registryKey = name;
    this.timeline = {};
  }

  setup(p5, systems) {
    this.#p5 = p5;
    this.#systems = systems;
    Object.values(this.timeline).forEach((timeline) => {
      timeline.setup(systems);
    })
  }

  setupComponents(components) {
    this.#components = components;
    Object.values(this.timeline).forEach((timeline) => {
      timeline.setupComponents(components);
    })
  }

  update() {
    Object.values(this.timeline).forEach((timeline) => {
      timeline.update();
    })
  };

  dispose() {}

  get p5() {
    return this.#p5;
  }

  get systems() {
    return this.#systems;
  }

  get components() {
    return this.#components;
  }

  get registryKey() {
    return this.#registryKey;
  }
}