import p5 from "p5";
import { loadElement } from "./utils/canvas/loadElement.js";
import { P5CanvasManager } from "./utils/canvas/p5CanvasManager.js";
import * as TweenAnime from "./lib/tweenAnime/tweenAnime.js";
import { EventListener } from "./utils/eventListener/eventListener.js";
import { OrbitShifter } from "./OrbitShifter.js"
import * as tweenAnime from "./lib/tweenAnime/tweenAnime.js";

window.addEventListener("DOMContentLoaded", () => {
    new p5(sketch, loadElement("#canvas_size"));
});
const sketch = (p5) => {
    const tests = [];
    p5.setup = () => {
        const canvas = new P5CanvasManager(p5, loadElement("#canvas_size"), 50);
        canvas.ratio = {
            width: 16,
            height: 9,
        };
        for (let i = 0; i < 10; i++) {
            const testToMove = new ToMove(p5, 300 + i * 20, 300, 300, 300 + i * 20, 450, p5.random(0, 20), TweenAnime.Easing.easeOutSine);
            const test = new Ball(p5, TweenAnime.Easing.easeInOutQuint, Math.floor(Math.random() * 81) + 80, testToMove);
            //ここでインスタンス化する時のframeをランダマイズしている
            //しかし、こうすることで集まり切る時間がずれているので注意
            tests.push(test);
        }
    };
    p5.draw = () => {
        p5.background(200, 200, 200);
        p5.fill(40);
        for (const test of tests) {
            test.update();
            test.display();
        }
        //testToMove.display();
        p5.circle(60, 60, 50);
    };
};
class Ball {
    constructor(p5, easing, easingFrame, toMove) {
        this.event = new EventListener();
        this.event.add("randomWalkFinished", () => {
            console.log("ok");
        });

        this.p5 = p5;
        // this.orbitShifter = new OrbitShifter();
        this.position = {
            x: toMove.fromPosition.x,
            y: toMove.fromPosition.y,
        };
        this.targetPosition = {
            x: toMove.position.x,
            y: toMove.position.y,
        };
        console.log(toMove.position);
        this.easing = easing;
        this.easingFrame = easingFrame;
        this.toMove = toMove;
        this.frameCurrent = 0;
        this.tween = new TweenAnime.FrameTween([this.position.x, this.position.y], [this.targetPosition.x, this.targetPosition.y], 30, TweenAnime.Easing.easeInOutSine);
    }
    update() {
        this.toMove.update();
        if (this.toMove.position.x != this.targetPosition.x) {
            this.frameCurrent++;
            this.tween = new TweenAnime.FrameTween([this.position.x, this.position.y], [this.toMove.position.x, this.toMove.position.y], this.easingFrame, TweenAnime.Easing.easeOutSine);

            this.orbitShifter = new OrbitShifter(
                this.easingFrame, 
                tweenAnime.Easing.easeInOutSine, 
                this.position.x,this.position.y, 
                this.targetPosition.x, 
                this.targetPosition.y
                );
        }
        this.targetPosition = {
            x: this.toMove.position.x,
            y: this.toMove.position.y,
        };
        this.tween.update();
        this.orbitShifter.update();
        this.position = {
            x: this.tween.getValues()[0] + this.orbitShifter.getShiftValue().x,
            y: this.tween.getValues()[1] + this.orbitShifter.getShiftValue().y,
            //ここでShiftValueをPosに適用している
        };
    }
    display() {
        this.p5.circle(this.position.x, this.position.y, 10);
    }
}







class ToMove {
    constructor(p5, fromX, fromY, toX, toY, frame, swingRange, easing) {
        this.p5 = p5;
        this.fromPosition = {
            x: fromX,
            y: fromY,
        };
        this.toPosition = {
            x: toX,
            y: toY,
        };
        //globalは普通に座標を
        this.globalPosition = {
            x: 0,
            y: 0,
        };
        //localはランダムウォークを管理
        this.localPosition = {
            x: 0,
            y: 0,
        };
        //globalとlocalの合計値
        this.position = {
            x: 0,
            y: 0,
        };
        //randomWalk部分
        this.prepareFrame = Math.trunc(frame / 2);
        this.countFrame = 0;
        this.swingRange = swingRange;
        this.tween = new TweenAnime.FrameTween([fromX, fromY], [toX, toY], frame, easing);
        this.shuffleArray = {
            x: this.setupRandomWalkArray(),
            y: this.setupRandomWalkArray(),
        };
    }
    setupRandomWalkArray() {
        // ランダム数値配列（mapを有効にするため一旦0で初期化）
        const deltaXArr = new Array(this.prepareFrame).fill(0).map(() => {
            return Math.random() * this.swingRange;
        });
        const deltaXArr2 = this.double(deltaXArr);
        const result = this.shuffle(deltaXArr2);
        return result;
    }
    double(arr) {
        const ret = [];
        arr.forEach((num) => {
            ret.push(num);
            ret.push(-num);
        });
        return ret;
    }
    // Fisher–Yatesアルゴリズムによる配列シャッフル
    shuffle(arr) {
        const ret = [].concat(arr);
        for (let i = ret.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i + 1));
            const tmp = ret[i];
            ret[i] = ret[r];
            ret[r] = tmp;
        }
        return ret;
    }
    update() {
        this.tween.update();
        this.globalPosition.x = this.tween.getValues()[0];
        this.globalPosition.y = this.tween.getValues()[1];
        if (this.countFrame < this.shuffleArray.x.length) {
            this.localPosition.x += this.shuffleArray.x[this.countFrame];
            this.localPosition.y += this.shuffleArray.y[this.countFrame];
            this.countFrame++;
        }
        this.position.x = this.globalPosition.x + this.localPosition.x;
        this.position.y = this.globalPosition.y + this.localPosition.y;
    }
    display() {
        this.p5.circle(this.position.x, this.position.y, 20);
    }
}
