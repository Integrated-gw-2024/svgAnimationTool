import * as TweenAnime from '../../../../lib/tweenAnime/tweenAnime'

import { Motion } from './motion';

export class Tween extends Motion {
  tween;

  constructor(froms, tos, frames, easing = TweenAnime.Easing.linear) {
    super(froms);
    this.motionTimeline.whole = frames;
    this.motionTimeline.current = 0;
    this.tween = new TweenAnime.FrameTween(froms, tos, frames, easing);
  }

  reset() {
    super.reset();
    this.tween.frame = 0;
  }

  update() {
    this.tween.update();
    this.motionTimeline.current = this.tween.frame;
    this.component[this.reflectKey] = this.tween.getValue();
  }

  set whole(frameTotal) {
    this.motionTimeline.whole = frameTotal;
    this.tween.frames = frameTotal;
  }

  get whole() {
    return this.motionTimeline.whole;
  }

  set current(frameCurrent) {
    this.motionTimeline.current = frameCurrent;
    this.tween.frame = frameCurrent;
  }

  get current() {
    return this._frameCurrent;
  }
}
