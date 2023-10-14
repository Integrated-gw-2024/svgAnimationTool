import { Pane } from "../tweakpane-4.0.1/tweakpane-4.0.1";

export class TweakPaneManager {
    constructor() {
        this.PARAMS = {
            motionType: 'linear',
            endFrame: 100,
        };
        this.pane = new Pane();
        this.pane.addBinding(this.PARAMS, 'motionType', {
            options: {
                linear: 'linear',
                easeInSine: 'easeInSine',
                easeOutSine: 'easeOutSine',
                easeInOutSine: 'easeInOutSine',
            },
        });
        this.pane.addBinding(this.PARAMS, 'endFrame');
    }
}