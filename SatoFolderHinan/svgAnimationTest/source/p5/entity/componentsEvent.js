import { EventListener } from "../../eventListener/eventListener";

export class ComponentsEvent {
  position;
  shape;
  timeline;

  constructor() {
    this.position = new EventListener();
    this.shape = new EventListener();
    this.timeline = new EventListener();
  }
}