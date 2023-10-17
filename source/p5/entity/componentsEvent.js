import { EventListener } from "../../eventListener/eventListener.js"

export class ComponentsEvent {
  #position;
  #shape;
  #timeline;

  constructor() {
    //this.position = new EventListener();
    //this.shape = new EventListener();
    this.#timeline = new EventListener();
  }

  get timeline() {
    return this.#timeline;
  }
}