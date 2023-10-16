import { Pane } from "../tweakpane-4.0.1/tweakpane-4.0.1";
import { EventListener } from "../eventListener/eventListener";

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
                radomWalk: 'randomWalk',
                easeInSine: 'easeInSine',
                easeOutSine: 'easeOutSine',
                easeInOutSine: 'easeInOutSine',
            },
        });
        this.pane.addBinding(this.PARAMS, 'endFrame');

        //イベントリスナーの設定
        this.event = new EventListener();
        this.event.add("PARAMSRefreshed");//外部からPARAMSをセットした瞬間に発火
        this.event.add("PARAMSInteracted");//Paneを操作し終わった瞬間

        this.pane.on('change', () => {
            this.event.dispatch("PARAMSInteracted", this.PARAMS);
        });
    }

    setData(newData) {
        for (let key in this.PARAMS) {//for...inでデータを順番に処理している
            if (newData.hasOwnProperty(key)) {//newDataにプロパティが設定してあれば
                console.log(`tweakPaneの${key} を ` + this.PARAMS[key] + " から " + newData[key] + " に更新しましす");
                this.PARAMS[key] = newData[key];//そのプロパティを更新する
            }
        }
        
        this.pane.refresh();
        this.event.dispatch("PARAMSRefreshed", this.PARAMS);
    }
}