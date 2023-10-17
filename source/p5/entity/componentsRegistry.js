import { ComponentsEvent } from "./componentsEvent";

import { Position } from "./components/position";
import { Circle } from "./components/shapes/circle";
import { Color } from "./components/color";
import { Stroke } from "./components/stroke";
import { TimelineComponent } from "./components/timelineComponent";

export class ComponentsRegistry {
  #p5;
  #systems;
  #event;

  #map;

  position;
  shape;
  color;
  stroke;
  timeline;

  constructor() {
    this.#event = new ComponentsEvent();

    this.#map = new Map();

    this.set(new Position());
    this.set(new Circle());
    this.set(new Color());
    this.set(new Stroke());
    this.set(new TimelineComponent());
  }

  setup(p5, systems) {
    this.#p5 = p5;
    this.#systems = systems;

    this.#map.forEach((component) => {
      component.setup(this.#p5, this.#systems);
    })
  }

  set(component) {
    component.setupComponents(this);

    if (this.#p5 != null && this.#systems != null) {
      component.setup(this.#p5, this.#systems);
    }

    Reflect.set(this, component.registryKey, component);
    this.#map.set(component.registryKey, Reflect.get(this, component.registryKey));
  }

  dispose() {
    this.#map.forEach((component) => {
      component.dispose();
    })
  }

  get event() {
    return this.#event;
  }

  get map() {
    return this.#map;
  }
}
