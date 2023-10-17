export class Motion {
  _component;
  _reflectKey;

  _frameTotal;
  _frameCurrent;

  motion;

  constructor(frameTotal) {
    this._frameTotal = frameTotal;
  }

  setup(component, reflectKey) {
    this._component = component;
    this._reflectKey = reflectKey;
  }

  isComplete() {
    if (this._frameCurrent >= this.frameTotal) return true;
    return false;
  }

  reset() {
    this._frameCurrent = 0;
  }

  update() {};
}
