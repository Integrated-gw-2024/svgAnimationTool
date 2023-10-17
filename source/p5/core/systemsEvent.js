import { EventListener } from "../../eventListener/eventListener";

export class SystemsEvent {
  #entity;
  #canvas;
  #timeline;

  constructor() {
    this.#entity = new EventListener();
    this.#canvas = new EventListener();
    this.#timeline = new EventListener();
  }

  get entity() {
    return this.#entity;
  }

  get canvas() {
    return this.#canvas;
  }

  get timeline() {
    return this.#timeline;
  }
}
