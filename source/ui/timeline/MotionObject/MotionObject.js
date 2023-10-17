import { Element } from "../../utility/Element";
import { EventListener } from "../../eventListener/eventListener";
import { HandleElement } from "./HandleElement";
import { TextsElement } from "./TextsElement";

export class MotionObject {
    style;
    parentELement_id;
    objectNumber;
    object;
    object_id;
    styles;
    width;
    startFrame;
    endFrame;
    duration;
    isSelect;
    isHover;
    textsElement;
    handleElement;
    parentEvent;
    mouseX;
    initMouseX;
    currentMouseX;
    mouseXDifference;
    frameRatio;
    _data;


    constructor(ParentELement_id, ObjectNumber, ParentEvent, ObjectName) {

        this.parentELement_id = ParentELement_id;
        this.objectNumber = ObjectNumber;
        this.parentEvent = ParentEvent;

        this.width = 300;
        this.isSelected = false;
        this.mouseX = 0;
        this.initMouseX = 0;
        this.currentMouseX = 0;
        this.mouseXDifference = 0;
        this.frameRatio = 2;//実際のpxとフレーム数の比率を調整している。
        this.objectName = ObjectName;

        //データの設定
        this._data = {
            startFrame: null,
            endFrame: null,
            duration: null,
            motionType: "linear",
        }

        //ここでこのMotionObjectのDOM要素を生成
        this.object_id = `motionObject_${this.objectNumber}`;
        this.object = new Element(this.parentELement_id, "id", this.object_id, "div");
        //クラスを設定する
        this.object.setClassList(['motionObject_baseStyle', 'motionObject_hoverStyle', 'motionObject_notSelected']);
        //styleのセットアップ
        this.initStyle();
        this.setClickEvent();
        this.setMargin(this.frameRatio);
        this.updateData();


        //イベントの設定
        this.event = new EventListener();
        this.event.add("startInteracted", () => {
            document.documentElement.style.cursor = "col-resize";//動かしてる時はカーソルの見た目を変える
            this.mouseXDifference = this.currentMouseX - this.initMouseX;
            this.initMouseX = this.mouseX;
        });
        this.event.add("interacted", () => {
            document.documentElement.style.cursor = "auto";//カーソルの見た目を戻す
            this.mouseXDifference = this.floatToInt(this.currentMouseX - this.initMouseX);//最終的にframeRatioの倍数になる
            this.setObjectWidth(this.width + this.mouseXDifference);//初期値がframeRatioの倍数なら、新しいwidthもframeRatioの倍数
            this.updateData();//start,end,durationを更新
            this.textsElement.setText("duration", this._data.duration);
            this.textsElement.setText("startFrame", this._data.startFrame);
            this.textsElement.setText("endFrame", this._data.endFrame);
            this.parentEvent.dispatch("motionObjectChanged", this.data);//親クラスのeventを発火
        });
        this.event.add("moving", () => {
            this.currentMouseX = this.mouseX;
            let preEndFrame = (this.floatToInt(this.currentMouseX - this.initMouseX) + this.width) / this.frameRatio + this._data.startFrame;
            this.textsElement.setText("endFrame", `${preEndFrame}`);
            let preWidth =(preEndFrame +1 -this._data.startFrame) * this.frameRatio;
            console.log(preEndFrame);
            this.styles = {
                width: `${preWidth}px`
            };
            this.object.setStyle(this.styles);
        });
        this.event.add("selected", () => {
            this.parentEvent.dispatch("motionObjectClicked", this.objectNumber);
            this.setIsSelected(true);
            this.setSelectStyle(true);
        });
        this.object.getDOMElement().addEventListener("mouseenter", (ev) => {
            this.isHover = true;
            this.textsElement.setTextStyle(this.isHover);
        });
        this.object.getDOMElement().addEventListener("mouseleave", (ev) => {
            this.isHover = false;
            this.textsElement.setTextStyle(this.isHover);
        });


        //テキストを作成
        this.textsElement = new TextsElement(this.object.getDOMElement(), "motionObject_textElement");
        this.textsElement.setText("name", this.objectName);
        this.textsElement.setText("duration", this._data.duration);
        this.textsElement.setText("startFrame", this._data.startFrame);
        this.textsElement.setText("endFrame", this._data.endFrame);
        //ハンドルを生成
        this.handleElement = new HandleElement(this.object.getDOMElement(), "endHandle", this.event);
    }

    setData(newData) {
        for (let key in this._data) {//for...inでデータを順番に処理している
            if (newData.hasOwnProperty(key)) {//newDataにプロパティが設定してあれば
                this._data[key] = newData[key];//そのプロパティを更新する
            }
        }
        this._data.duration = (this._data.endFrame + 1) - this._data.startFrame;
        this.width = (this._data.duration + this.frameRatio) * this.frameRatio;//1フレーム分のピクセルを足してから倍率をかけている
        this.textsElement.setText("duration", this._data.duration);
        this.textsElement.setText("startFrame", this._data.startFrame);
        this.textsElement.setText("endFrame", this._data.endFrame);
        this.textsElement.setText("motionType", this._data.motionType);
        this.setObjectWidth(this.width);
    }

    initStyle() {
        this.styles = {
            width: `${this.width}px`
        };
        this.object.setStyle(this.styles);
    }

    setObjectWidth(value) {
        if (value >= 10 * this.frameRatio) {
            this.width = value;
        } else { this.width = 10 * this.frameRatio }
        this.styles = {
            width: `${this.width}px`
        };
        this.object.setStyle(this.styles);
    }

    setMargin(value) {//ひとつのmotionObjectの次のオブジェクトを一フレーム前に押し出すためのマージン設定
        this.styles = {
            marginRight: `${value}px`
        };
        this.object.setStyle(this.styles);
    }

    setSelectStyle(IsSelected) {
        if (IsSelected) {
            //選択状態にする
            this.object.replaceClassList("motionObject_notSelected", "motionObject_selected");
        }
        else if (!IsSelected) {
            //未選択状態にする
            this.object.replaceClassList("motionObject_selected", "motionObject_notSelected");
        }
    }
    setIsSelected(value) {
        this.isSelected = value;
    }

    setClickEvent() {
        this.object.getDOMElement().addEventListener("mousedown", () => {
            this.event.dispatch("selected");
        });
    }

    setMouseX(X) {
        this.mouseX = X;
    }

    floatToInt(number) {
        return this.frameRatio * Math.ceil(number / this.frameRatio);
    }


    updateData() {
        // div要素を取得
        let timeLineElement = document.getElementById("timeline");
        // div要素のバウンディングボックスを取得
        let ParentRect = timeLineElement.getBoundingClientRect();
        let MotionObjectRect = this.object.getDOMElement().getBoundingClientRect();
        // div要素の左端からのMotionObjectの相対X座標を計算
        this._data.startFrame = (MotionObjectRect.left - ParentRect.left + timeLineElement.scrollLeft) / this.frameRatio;
        this._data.endFrame = ((MotionObjectRect.right) - ParentRect.left + timeLineElement.scrollLeft) / this.frameRatio;
        this._data.duration = (this._data.endFrame + 1) - this._data.startFrame;
    }

    get data() {
        return this._data;
    }
}