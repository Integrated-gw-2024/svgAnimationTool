export class P5CanvasManager {
    constructor(p5, adjustElement, waitTime = 500) {
        this.adjustElement = adjustElement;
        this.p5 = p5;
        this.ratio = null;
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        this.queue = setTimeout(this.resize.bind(this));
        window.addEventListener("resize", () => {
            clearTimeout(this.queue);
            this.queue = setTimeout(this.resize.bind(this), waitTime);
        });
    }
    resize() {
        const elementRatio = this.adjustElement.clientWidth / this.adjustElement.clientHeight;
        if (this.ratio == null) {
            this.p5.resizeCanvas(this.adjustElement.clientWidth, this.adjustElement.clientHeight);
            return;
        }
        if (this.ratio.width / this.ratio.height < elementRatio) {
            this.p5.resizeCanvas((this.adjustElement.clientHeight / this.ratio.height) * this.ratio.width, this.adjustElement.clientHeight);
        }
        else if (this.ratio.width / this.ratio.height > elementRatio) {
            this.p5.resizeCanvas(this.adjustElement.clientWidth, (this.adjustElement.clientWidth / this.ratio.width) * this.ratio.height);
        }
        else {
            this.p5.resizeCanvas(this.adjustElement.clientHeight, this.adjustElement.clientHeight);
        }
    }
}
