import { Element } from "./Element";
import { TimelineStyle } from "./TimelineStye";
import { MotionObject } from "./MotionObject/MotionObject";
import { MotionObjectContainer } from "./MotionObjectContainer";
import { SetMotionObjectClassStyle } from "./MotionObject/SetMotionObjectClassStyle";
import { EventListener } from "./eventListener/eventListener";

export class Timeline {
    parentElementStyle;
    parentElement_id;
    motionObjectContainer;
    motionObjectContainer_id;
    motionObjects = [];
    motionObjectClassStyle;
    event;
    selectedObjectNumber;
    mouseX;


    constructor(ParentElement_id) {
        //タイムラインのstyleの設定
        this.parentElement_id = ParentElement_id;
        this.parentElementStyle = new TimelineStyle(this.parentElement_id);
        //イベントの設定
        this.event = new EventListener();
        this.event.add("motionObjectClicked", (SelectedObjectNumber) => {
            this.selectedObjectNumber = SelectedObjectNumber;
            this.allMotionObjectsResetSelect();
        });
        this.event.add("motionObjectChanged");
        this.event.add("framePointerMoved");

        //motionObjectContainerの作成
        this.motionObjectContainer_id = "motionObjectContainer";
        this.motionObjectContainer = new MotionObjectContainer(this.parentElement_id, this.motionObjectContainer_id);

        //motionObjectのstylesの設定をしている
        this.motionObjectClassStyle = new SetMotionObjectClassStyle();

        this.setMouseXCalcEventListener()
    }

    //これでMotionObjectが増やせるよ
    pushMotionObject() {
        this.motionObjects.push(new MotionObject(this.motionObjectContainer_id, this.motionObjects.length, this.event));
    }
    //これでMotionTypeの表示を変更できるよ
    setMotionType(MotionType){
        if(this.selectedObjectNumber == undefined){return}
        this.motionObjects[this.selectedObjectNumber].setMotionType(MotionType);
    }
    //これでMotionObjectのframe関連を設定できるよ
    setMotionObjectFrames(MotionObjectNum, StartFrame, EndFrame){
        this.motionObjects[MotionObjectNum].setFrames(StartFrame, EndFrame);
    }



    allMotionObjectsResetSelect() {
        for (let obj of this.motionObjects) {
            obj.setIsSelected(false);
            obj.setSelectStyle(false);
        }
    }

    setMouseXCalcEventListener(){
        //mouseXの計算
        // div要素を取得
        this.timeLineElement = document.getElementById(this.parentElement_id);
        // mousemoveイベントをリスンする
        this.timeLineElement.addEventListener('mousemove', (event) => {
            // div要素のバウンディングボックスを取得
            const rect = this.timeLineElement.getBoundingClientRect();
            // div要素の左端からのマウスの相対X座標を計算
            this.mouseX = event.clientX - rect.left + this.timeLineElement.scrollLeft;
            //motionObjectに現在のtimeline上のmouseXを設定する
            for(let obj of this.motionObjects){
                obj.setMouseX(this.mouseX);
            }
        });
    }

    getSelectedObjectNumber(){
        return this.selectedObjectNumber;
    }
    getMotionObjectFrames(i){
        return this.motionObjects[i].frames;
    }
    
}