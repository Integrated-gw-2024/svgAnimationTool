import { SystemsRegistry } from "./systemsRegistry";

export class World {
  p5;
  entities;
  systems;

  constructor(p5) {
    this.p5 = p5;

    this.systems = new SystemsRegistry(p5);
    this.entities = [];
  }

  add(entity) {
    entity.setup(this.p5, this.systems);
    this.entities.push(entity);
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
}