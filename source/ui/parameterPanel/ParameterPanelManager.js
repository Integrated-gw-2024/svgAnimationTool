import { Pane } from "../tweakpane-4.0.1/tweakpane-4.0.1";
import { EventListener } from "../eventListener/eventListener";

export class ParameterPanelManager {
    isAppear;//boolean型で、paneが表示されているかどうかを示している。

    constructor() {
        //イベントリスナーの設定
        this.event = new EventListener();
        this.event.add("PARAMSRefreshed");//外部からPARAMSをセットした瞬間に発火
        this.event.add("PARAMSInteracted");//Paneを操作し終わった瞬間

        this.pane = new Pane();
        this.pane.on('change', (event) => {
            this.event.dispatch("PARAMSInteracted", this.PARAMS);
        });

        this.isAppear = false;

        this.PARAMS = {
            motionType: 'linear',
            endFrame: 100,
            motionPARAMS: {
                randomWalk_Range: 15,
            },
        };
    }

    addBindings(){
        this.pane.addBinding(this.PARAMS, 'motionType', {
            options: {
                linear: 'linear',
                radomWalk: 'randomWalk',
                easeInQuad: 'easeInQuad',
                easeOutQuad:'easeOutQuad',
                easeInOutQuad: 'easeInOutQuad',
                easeInCubic: 'easeInCubic',
                easeOutCubic: 'easeOutCubic',
                easeInOutCubic: 'easeInOutCubic',
                easeInQuart: 'easeInQuart',
                easeOutQuart: 'easeOutQuart',
                easeInOutQuart: 'easeInOutQuart',
                easeInQuint: 'easeInQuint',
                easeOutQuint: 'easeOutQuint',
                easeInOutQuint: 'easeInOutQuint',
                easeInSine: 'easeInSine',
                easeOutSine: 'easeOutSine',
                easeInOutSine: 'easeInOutSine',
                easeInExpo: 'easeInExpo',
                easeOutExpo: 'easeOutExpo',
                easeInOutExpo: 'easeInOutExpo',
                easeInCirc: 'easeInCirc',
                easeOutCirc: 'easeOutCirc',
                easeInOutCirc: 'easeInOutCirc',
                easeInElastic: 'easeInElastic',
                easeOutElastic: 'easeOutElastic',
                easeInOutElastic: 'easeInOutElastic',
                easeInBack: 'easeInBack',
                easeOutBack: 'easeOutBack',
                easeInOutBack: 'easeInOutBack',
                easeInBounce: 'easeInBounce',
                easeOutBounce: 'easeOutBounce',
                easeInOutBounce: 'easeInOutBounce',
            },
        }).on('change', (event) => {
            if (event.value == 'randomWalk') {
                const randomWalkPane = this.pane.addBinding(
                    this.PARAMS.motionPARAMS,
                    'randomWalk_Range', {
                        min: 0,
                        max: 200,
                    }
                );

                this.event.add('disposeRandomWalk', () => {
                    randomWalkPane.dispose();
                })
            } else {
                try {
                    this.event.dispatch('disposeRandomWalk');
                } catch {}
            }
        });
        this.pane.addBinding(this.PARAMS, 'endFrame');
        this.isAppear = true;
    }

    dispose(){
        this.pane.dispose();
        this.isAppear = false;
    }

    setData(newData) {
        for (let key in this.PARAMS) {//for...inでデータを順番に処理している
            if (newData.hasOwnProperty(key)) {//newDataにプロパティが設定してあれば
                this.PARAMS[key] = newData[key];//そのプロパティを更新する
            }
        }

        this.pane.refresh();
        this.event.dispatch("PARAMSRefreshed", this.PARAMS);
    }

    get isAppear(){
        return this.isAppear;
    }
}