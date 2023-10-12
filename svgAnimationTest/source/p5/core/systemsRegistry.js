import { SystemsEvent } from "./systemsEvent";

import { CanvasManager } from "./systems/canvasManager";

export class SystemsRegistry {
  #p5;
  #event;

  map;

  canvas;

  constructor(p5) {
    this.#p5 = p5;
    this.#event = new SystemsEvent();

    this.map = new Map();

    this.set(new CanvasManager());
  }

  set(system) {
    system.setup(this.#p5, this.#event);

    Reflect.set(this, system.registryKey, system);
    this.map.set(system.registryKey, Reflect.get(this, system.registryKey));
  }

  get event() {
    return this.#event;
  }
}