import { SystemsRegistry } from "./systemsRegistry";

export class World {
  #p5;
  #entities;
  #systems;

  constructor(p5) {
    this.#p5 = p5;

    this.#systems = new SystemsRegistry(p5);
    this.#entities = new Map();
  }

  addEntity(entity) {
    entity.setup(this.#p5, this.#systems);

    this.#systems.event.entity.once('remove', (uuid) => {
      this.#remove(uuid);
    }, entity);

    this.entities.set(entity.uuid, entity);
  }

  #remove(uuid) {
    this.#entities.delete(uuid);
  }

  update()  {
    this.entities.forEach((entity) => {
      entity.update();
    });
  }

  display() {
    this.entities.forEach((entity) => {
      entity.display();
    });
  }

  get entities() {
    return this.#entities;
  }

  get systems() {
    return this.#systems;
  }
}
