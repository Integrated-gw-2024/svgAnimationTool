export class System {
  _p5;
  _systemsEvent;

  #registryKey;

  constructor(name) {
    this.#registryKey = name;
  }

  setup(p5, systemsEvent) {
    this._p5 = p5;
    this._systemsEvent = systemsEvent;
  }

  get registryKey() {
    return this.#registryKey;
  }
}