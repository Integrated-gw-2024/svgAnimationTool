import { Timeline } from "./timeline/Timeline";
import { TweakPaneManager } from "./tweakPane/TweakPaneManager";
import { EventListener } from "./eventListener/eventListener";

export class ControlManager {
    timeline;
    selectedMotionData;//今何のデータを選択しているか

    constructor() {
        this.timeline = new Timeline("timeline");
        this.tweakPaneManager = new TweakPaneManager();

        //イベントリスナーの設定
        this.event = new EventListener();
        this.event.add("parameterChanged");//何かしらのパラメーターが操作された瞬間に発火
        this.event.add("motionObjectSelected");//モーションオブジェクトが選択された時に発火
        this.event.add("motionObjectAdded");//motionObjectが作られた瞬間に発火すし、最新の追加されたmotionObjectのPARAMSと、motionObjectのlengthを渡している

        this.tweakPaneManager.event.add("PARAMSInteracted", (PARAMS) => {
            this.event.dispatch("parameterChanged", this.selectedMotionData, PARAMS);
            this.setMotionObjectPARAMS(PARAMS);
        });
        this.timeline.event.add("motionObjectChanged", (PARAMS) => {
            this.event.dispatch("parameterChanged", this.selectedMotionData, PARAMS);
            this.tweakPaneManager.setData(PARAMS);//tweakPaneの値を更新する
        });
        this.timeline.event.add("motionObjectClicked", (SelectedObjectNumber) => {
            this.selectedMotionData = SelectedObjectNumber;//選択しているmotionDataの更新
            if (!this.tweakPaneManager.isAppear) {
                this.tweakPaneManager.addBindings();
            }
            this.event.dispatch("motionObjectSelected", this.selectedMotionData);
            this.tweakPaneManager.setData(this.timeline.getMotionObjectData(SelectedObjectNumber));//tweakPaneの値を更新する
        });
    }

    addMotionObject() {
        this.timeline.pushMotionObject();
        this.event.dispatch("motionObjectAdded",
            this.timeline.getMotionObjectData(this.timeline.getMotionObjectLength() - 1),
            this.timeline.getMotionObjectLength() - 1);//最新の追加されたmotionObjectのPARAMSと、motionObjectのlengthを渡している
    }
    setMotionObjectPARAMS(PARAMS) {
        if (this.selectedMotionData == undefined) {
            this.timeline.setMotionObjectData(0, PARAMS);
        }
        else { this.timeline.setMotionObjectData(this.selectedMotionData, PARAMS); }
    }
}