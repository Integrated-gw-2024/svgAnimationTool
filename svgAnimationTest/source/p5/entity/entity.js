import { ComponentsRegistry } from "./componentsRegistry";

export class Entity {
  #p5;
  #systems;
  components;

  constructor() {
    this.components = new ComponentsRegistry();
  }

  setup(p5, systems) {
    this.#p5 = p5
    this.#systems = systems;
    this.components.setup(this.#p5, this.#systems);
  }

  update() {
    this.components.map.forEach((component) => {
      if (component == null) return;
      component.update();
    })
  }

  display() {
    this.components.color.display();
    this.components.stroke.display();
    this.components.shape.display();
  }
}