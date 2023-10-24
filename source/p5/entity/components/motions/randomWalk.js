import * as TweenAnime from '../../../../lib/tweenAnime/tweenAnime.js'
import { Motion } from './motion.js';

export class RandomWalk extends Motion {
  tween;

  constructor(from, to, frames, easing = TweenAnime.Easing.easeOutSine, swingRange = 15) {
    super(frames);
    this.motionTimeline.whole = frames;
    this.motionTimeline.current = 0;

    this.from = from;
    this.to = to;
    this.swingRange = swingRange;
    this.frames = frames;
    this.easing = easing;

    this.homingEasingFrame = 20;
    if (this.frames < this.homingEasingFrame) {
      this.homingEasingFrame = this.frames / 2
    }

    const randomMove = new RandomMove(from, to, frames - this.homingEasingFrame, swingRange, TweenAnime.Easing.easeInOutQuad);
    this.tween = new HomingToRandomMove(easing, this.homingEasingFrame, randomMove);
  }

  reset() {
    super.reset();
    this.motionTimeline.current = 0;
    const randomMove = new RandomMove(this.from, this.to, this.frames - this.homingEasingFrame, this.swingRange, TweenAnime.Easing.easeOutSine);
    this.tween = new HomingToRandomMove(this.easing, this.homingEasingFrame, randomMove);
  }

  update() {
    this.tween.update();
    this.motionTimeline.current++;
    this.component[this.reflectKey] = this.tween.value;
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

class HomingToRandomMove {
  constructor(easing, easingFrame, randomMove) {
    this.value = randomMove.from;
    this.targetValue = randomMove.value
    this.easing = easing;
    this.easingFrame = easingFrame;
    this.randomMove = randomMove;

    this.homingFrameCurrent = 0;
    this.tween = new TweenAnime.FrameTween(this.value, this.targetValue, easingFrame, easing);
  }

  update() {
    this.randomMove.update();
    if (this.randomMove.value != this.targetValue) {
      this.homingFrameCurrent++;
      this.targetValue = this.randomMove.value;
      this.tween = new TweenAnime.FrameTween(this.value, this.targetValue, this.easingFrame, this.easing);
    }

    this.tween.update();
    this.value = this.tween.getValue();
  }
}

class RandomMove {
  constructor(from, to, frames, swingRange, easing) {
    this.from = from;
    this.to = to;
    this.easingValue = 0;
    this.randomWalkValue = 0;
    this.value = 0;

    //randomWalk部分
    this.prepareFrame = Math.trunc(frames / 2);
    this.countFrame = 0;
    this.swingRange = swingRange;
    this.tween = new TweenAnime.FrameTween(from, to, frames, easing);
    this.shuffleArray = this.setupRandomWalkArray();
  }

  setupRandomWalkArray() {
    // ランダム数値配列（mapを有効にするため一旦0で初期化）
    const deltaXArr = new Array(this.prepareFrame).fill(0).map(() => {
      return Math.random() * this.swingRange;
    });
    const deltaXArr2 = this.double(deltaXArr);
    const result = this.shuffle(deltaXArr2);
    return result;
  }

  double(arr) {
    const ret = [];
    arr.forEach((num) => {
      ret.push(num);
      ret.push(-num);
    });
    return ret;
  }

  // Fisher–Yatesアルゴリズムによる配列シャッフル
  shuffle(arr) {
    const ret = [].concat(arr);
    for (let i = ret.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = ret[i];
      ret[i] = ret[r];
      ret[r] = tmp;
    }
    return ret;
  }

  update() {
    this.tween.update();
    this.easingValue = this.tween.getValue();
    if (this.countFrame < this.shuffleArray.length) {
      this.randomWalkValue += this.shuffleArray[this.countFrame];
      this.countFrame++;
    }
    this.value = this.randomWalkValue + this.easingValue;
  }
}
