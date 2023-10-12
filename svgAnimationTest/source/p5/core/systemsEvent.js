import { EventListener } from "../../eventListener/eventListener";

export class SystemsEvent {
  canvas;

  constructor() {
    this.canvas = new EventListener();
  }
}