export class Component {
  _p5;
  _systems;
  _components;

  #registryKey

  timeline;

  constructor(name) {
    this.#registryKey = name;
  }

  setup(p5, systems, components) {
    this._p5 = p5;
    this._systems = systems;
    this._components = components;
  }

  get registryKey() {
    return this.#registryKey;
  }

  update() {
    if (this.timeline == null) return;
    Object.values(this.timeline).forEach((timeline) => {
      timeline.update();
    })
  };
}