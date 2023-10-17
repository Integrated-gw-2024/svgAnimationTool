import p5 from 'p5';
import { sketch } from './p5/sketch'

document.addEventListener("DOMContentLoaded", setup);

function setup() {
  const app = new p5(sketch, document.querySelector('#canvas_size'));
}
