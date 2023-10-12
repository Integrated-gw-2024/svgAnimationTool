import * as TweenAnime from '../../../../lib/tweenAnime/tweenAnime'

import { Motion } from './motion';

export class Tween extends Motion {
  tween;

  constructor(froms, tos, frames, easing = TweenAnime.Easing.linear) {
    super(froms);
    this._frameTotal = frames;
    this._frameCurrent = 0;
    this.tween = new TweenAnime.FrameTween(froms, tos, frames, easing);
  }

  reset() {
    super.reset();
    this.tween.frame = 0;
  }

  update() {
    this.tween.update();
    this._frameCurrent = this.tween.frame;
    this._component[this._reflectKey] = this.tween.getValue();
  }

  set frameTotal(frameTotal) {
    this._frameTotal = frameTotal;
    this.tween.frames = frameTotal;
  }

  get frameTotal() {
    return this._frameTotal;
  }

  set frameCurrent(frameCurrent) {
    this._frameCurrent = frameCurrent;
    this.tween.frame = frameCurrent;
  }

  get frameCurrent() {
    return this._frameCurrent;
  }
}
