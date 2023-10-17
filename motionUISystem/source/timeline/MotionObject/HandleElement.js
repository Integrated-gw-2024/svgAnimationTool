import { Element } from "../../utility/Element"
import { EventListener } from "../../eventListener/eventListener";

export class HandleElement {
    constructor(ParentElement_id, ClassName, ParentEvent) {
        this.parentElement_id = ParentElement_id;
        this.className = ClassName;
        this.parentEvent = ParentEvent;


        this.handle = new Element(this.parentElement_id, "class", this.className, "div");

        //今操作されているかどうかの変数
        this.isInteracted = false;
        //イベントリスナー
        this.event = new EventListener();



        this.setHandleStyle();
        this.setInteractedEvent();
        this.setMovingEvent();
    }

    setHandleStyle() {
        this.styles = {
            width: '15px',
            height: '100%',
            boxShadow: "0px 0px 7px #222222",
            borderRadius: "3px",
            backgroundColor: "#FFFFFF",
            cursor: "col-resize",
        };
        this.handle.setStyle(this.styles);
    }

    setInteractedEvent() {
        this.handle.getDOMElement().addEventListener("mousedown", (event) => {
            this.isInteracted = true;
            this.parentEvent.dispatch("startInteracted");
        });
        document.addEventListener("mouseup", () => {
            if (this.isInteracted == true) {
                this.parentEvent.dispatch("interacted");
            }
            this.isInteracted = false;
        });
    }
    //この実装はかなり良くない気がするのでやめた方がいいかもしれない
    setMovingEvent() {
        document.addEventListener("mousemove", (event) => {
            if (this.isInteracted == true) {
                this.parentEvent.dispatch("moving",event);
            }
        });
    }

}