import { Element } from "./Element";

//MotionObjectをdivの中に入れたいので、htmlの階層のためだけに作ったクラス
export class MotionObjectContainer {
    parentElement_id;
    name;
    motionContainer;
    styles;

    constructor(ParentElement_id, TagName) {
        this.parentElement_id = ParentElement_id;
        this.tagName = TagName;
        this.motionContainer = new Element(this.parentElement_id, "id", this.tagName, "div");
        this.setContainerStyle();
    }

    setContainerStyle() {
        this.styles = {
            height: "15vh",
            display: "flex",
            flexDirection: "row",
            marginTop: "7vh",
            marginRight: "30vw"
        };
        this.motionContainer.setStyle(this.styles);
    }
}