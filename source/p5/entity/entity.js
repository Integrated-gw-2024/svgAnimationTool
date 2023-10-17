import { ComponentsRegistry } from "./componentsRegistry";

export class Entity {
  #uuid;

  #p5;
  #systems;
  #components;

  constructor() {
    this.#uuid = crypto.randomUUID();
    this.#components = new ComponentsRegistry();
    this.#components.event.timeline.once('remove', () => {
      this.dispose();
    });
  }

  setup(p5, systems) {
    this.#p5 = p5
    this.#systems = systems;
    this.#components.setup(this.#p5, this.#systems);
  }

  dispose() {
    this.#components.dispose();
    this.#components = null;
    this.#systems.event.entity.dispatchScope('remove', this, this.#uuid);
  }

  update() {
    this.#components.map.forEach((component) => {
      if (component == null) return;
      component.update();
    })
  }

  display() {
    this.#components.color.display();
    this.#components.stroke.display();
    this.#components.shape.display();
  }

  get uuid() {
    return this.#uuid;
  }

  get systems() {
    return this.#systems;
  }

  get components() {
    return this.#components;
  }
}
