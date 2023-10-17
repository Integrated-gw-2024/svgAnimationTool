import { SystemsEvent } from "./systemsEvent";

import { CanvasManager } from "./systems/canvasManager";
import { TimelineSystem } from "./systems/timelineSystem";

export class SystemsRegistry {
  #p5;
  #event;

  #map;

  canvas;
  timeline;

  constructor(p5) {
    this.#p5 = p5;
    this.#event = new SystemsEvent();

    this.#map = new Map();

    this.set(new CanvasManager());
    this.set(new TimelineSystem());
  }

  set(system) {
    system.setup(this.#p5, this.#event);

    Reflect.set(this, system.registryKey, system);
    this.#map.set(system.registryKey, Reflect.get(this, system.registryKey));
  }

  get event() {
    return this.#event;
  }
}