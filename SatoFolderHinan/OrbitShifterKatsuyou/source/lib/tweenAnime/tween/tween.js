import { Timer } from "../util/timer";

export class Tween extends Timer {
  constructor(froms, tos, duration, easing = Easing.linear) {
    super(duration);
    
    if (froms.length !== tos.length) {
      throw new Error("引数fromsと引数tosの要素数は同じにしてください");
    }

    if (typeof froms == "number") {
      this.froms = [froms]
      this.tos = [tos]
    } else {
      this.froms = froms;
      this.tos = tos;
    }
    this.easing = easing;
    this.targets = [];
  }
  
  getValue() {
    if (this.getCompleat()) this.stop();
    
    return Math_n.map(this.easing(this.getProgress()), 0, 1, this.froms[0], this.tos[0]);
  }
  
  getValues() {
    if (this.getCompleat()) this.stop();
    
    const result = new Array(this.froms.length);
    for (let i = 0; i < this.froms.length; i++) {
      result[i] = Math_n.map(this.easing(this.getProgress()), 0, 1, this.froms[i], this.tos[i]);
    }
    
    return result;
  }
  
  reverse() {
    super.reverse();   
    super.start();
  }
  
  start() {
    super.start();    
    if (this.getReverse()) this.reverse();
  }
  
  update() {
    if (this.getCompleat()) this.stop();
    
    for (let i = 0; i < this.targets.length; i++) {
      this.targets[i].setValue(Math_n.map(this.easing.get(this.getProgress()), 0, 1, this.froms[i], this.tos[i]));
    }
  }
}