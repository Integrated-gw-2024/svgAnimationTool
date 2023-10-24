import { Timeline } from "./timeline/Timeline";
import { ParameterPanelManager } from "./parameterPanel/ParameterPanelManager";
import { EventListener } from "./eventListener/eventListener";

export class ControlManager {
    timeline;
    selectedMotionData;//今何のデータを選択しているか

    constructor() {
        this.timeline = new Timeline("timeline");
        this.parameterPanelManager = new ParameterPanelManager();

        //イベントリスナーの設定
        this.event = new EventListener();
        this.event.add("parameterChanged");//何かしらのパラメーターが操作された瞬間に発火
        this.event.add("motionObjectSelected");//モーションオブジェクトが選択された時に発火
        this.event.add("motionObjectAdded");//motionObjectが作られた瞬間に発火すし、最新の追加されたmotionObjectのPARAMSと、motionObjectのlengthを渡している

        this.parameterPanelManager.event.add("PARAMSInteracted", (PARAMS) => {
            this.event.dispatch("parameterChanged", this.selectedMotionData, PARAMS);
            this.setMotionObjectPARAMS(PARAMS);
        });
        this.timeline.event.add("motionObjectChanged", (PARAMS) => {
            this.event.dispatch("parameterChanged", this.selectedMotionData, PARAMS);
            this.parameterPanelManager.setData(PARAMS);//parameterPanelの値を更新する
        });
        this.timeline.event.add("motionObjectClicked", (SelectedObjectNumber) => {
            this.selectedMotionData = SelectedObjectNumber;//選択しているmotionDataの更新
            if (!this.parameterPanelManager.isAppear) {
                this.parameterPanelManager.addBindings();
            }
            this.event.dispatch("motionObjectSelected", this.selectedMotionData);
            this.parameterPanelManager.setData(this.timeline.getMotionObjectData(SelectedObjectNumber));//parameterPanelの値を更新する
        });
    }

    addMotionObject(ObjectName) {
        this.timeline.pushMotionObject(ObjectName);
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

    setParameterPanel(){
        
    }
}