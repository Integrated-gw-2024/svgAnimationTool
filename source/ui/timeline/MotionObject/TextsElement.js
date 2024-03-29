import { Element } from "../../utility/Element"

export class TextsElement {
    constructor(ParentElement_id, ClassName) {
        this.parentElement_id = ParentElement_id;
        this.className = ClassName;
        this.text = "created"
        this.textContainer = new Element(this.parentElement_id, "class", "MotionObject_textContainer", "div");
        this.textElement = new Element(this.textContainer.getDOMElement(), "class", this.className, "p");
        this.textElements = {
            name: new Element(this.textContainer.getDOMElement(), "class", this.className, "p"),
            motionType: new Element(this.textContainer.getDOMElement(), "class", this.className, "p"),
            startFrame: new Element(this.textContainer.getDOMElement(), "class", this.className, "p"),
            endFrame: new Element(this.textContainer.getDOMElement(), "class", this.className, "p"),
            duration: new Element(this.textContainer.getDOMElement(), "class", this.className, "p"),
        }
        this.setTextStyle(false);
        this.initText();
    }

    setTextStyle(IsHover) {
        if(IsHover){
            this.styles = {
                color: "#000001",
                userSelect: "none",
                whiteSpace: "nowrap",
            };
        }else{
            this.styles = {
                color: "#DDDDEE",
                userSelect: "none",
                whiteSpace: "nowrap",
            };
        }
        this.textElements.name.setStyle(this.styles);
        this.textElements.duration.setStyle(this.styles);
        this.textElements.startFrame.setStyle(this.styles);
        this.textElements.endFrame.setStyle(this.styles);
        this.textElements.motionType.setStyle(this.styles);

        this.styles = {
            minWidth: 0,
            overflowX: "scroll",
        }
        this.textContainer.setStyle(this.styles);
    }

    initText() {
        this.setText("motionType", "linear");
    }
    setText(TextType, Text) {
        this.textElements[TextType].getDOMElement().textContent = null;
        this.textElements[TextType].getDOMElement().textContent = `${TextType} : ` + Text;
    }
}