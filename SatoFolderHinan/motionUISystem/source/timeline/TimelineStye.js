export class TimelineStyle {
    targetElement_id;
    timelineStyle;
    timelineWidth;

    constructor(TargetElement_id) {
        this.timelineWidth = 0;
        this.targetElement_id = TargetElement_id
        this.timelineStyle = document.createElement("style");
        document.head.appendChild(this.timelineStyle);
        this.timelineStyle.sheet.insertRule(`
        #${this.targetElement_id} {
                    width: 99vw;
                    min-width: 99vw;
                    height: 30vh;
                    background-color: #555560;
                    border-radius: 5px;
                    box-shadow: 0px 0px 7px #909090;
                    position: fixed;
                    top: 69vh;
                    left: 0.5vw;
                    display: flex;
                    flex-direction: row;
                    overflow-x: scroll;
                    user-select: none;
                }`, 0);
    }
}

