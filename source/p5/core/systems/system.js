export class System {
  #p5;
  #systemsEvent;
  
  #registryKey;

  constructor(name) {
    this.#registryKey = name;
  }

  setup(p5, systemsEvent) {
    this.#p5 = p5;
    this.#systemsEvent = systemsEvent;
  }

  update() {}

  get p5() {
    return this.#p5;
  }

  get systemsEvent() {
    return this.#systemsEvent;
  }

  get registryKey() {
    return this.#registryKey;
  }
}