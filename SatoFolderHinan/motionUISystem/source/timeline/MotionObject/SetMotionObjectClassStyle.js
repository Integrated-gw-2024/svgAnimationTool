import { Style } from "../../utility/Style";

export class SetMotionObjectClassStyle{
    constructor(){
        this.createMotionObjectStyle();
    }

    createMotionObjectStyle(){
        let motionObject_baseStyles = `
        .motionObject_baseStyle{
            height: 20vh;
            flex-shrink: 0;
            display: grid;
            grid-template-columns: 1fr 15px;
            box-sizing: border-box;
            box-shadow: 0px 0px 7px #000000;
            border-radius: 5px;
        }`;
        let motionObject_baseStyle = new Style(motionObject_baseStyles);
        let normalStyles = `
        .motionObject_hoverStyle{
            background-color: #222222;
        }`;
        let normalStyle = new Style(normalStyles);
        let hoverStyles = `
        .motionObject_hoverStyle:hover{
            background-color: #BBBBBB;
        }`;
        let hoverStyle = new Style(hoverStyles);
        let notSelectedStyles = `
        .motionObject_notSelected{
            border: 2px solid #000000;
        }`;
        let notSelectedStyle = new Style(notSelectedStyles);
        let selectedStyles = `
        .motionObject_selected{
            border: 2px solid #FF0000;
        }`;
        let selectedStyle = new Style(selectedStyles);
    }
}