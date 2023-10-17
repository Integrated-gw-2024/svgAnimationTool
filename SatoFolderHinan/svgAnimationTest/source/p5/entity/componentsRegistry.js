import { ComponentsEvent } from "./componentsEvent";

import { Position } from "./components/position";
import { Circle } from "./components/shapes/circle";
import { Color } from "./components/color";
import { Stroke } from "./components/stroke";
//import { TimeLine } from "./components/timeLine";

export class ComponentsRegistry {
  #p5;
  #systems;
  #event;

  map;

  position;
  shape;
  color;
  stroke;

  constructor() {
    this.#event = new ComponentsEvent();

    this.map = new Map();

    this.set(new Position());
    this.set(new Circle());
    this.set(new Color());
    this.set(new Stroke());
  }

  setup(p5, systems) {
    this.#p5 = p5;
    this.#systems = systems;

    this.map.forEach((component) => {
      component.setup(this.#p5, systems, this);
    })
  }

  set(component) {
    if (this.#p5 != null && this.#systems != null) {
      component.setup(this.#p5, this.#systems, this);
    }
    Reflect.set(this, component.registryKey, component);
    this.map.set(component.registryKey, Reflect.get(this, component.registryKey));
  }

  get event() {
    return this.#event
  }
}
