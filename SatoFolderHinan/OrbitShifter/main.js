let shifter;

function setup() {
    createCanvas(800, 800);
    shifter = new OrbitShifter(100, neko.Easing.easeInOutSine, 0, 0, 100, 800);
}

function draw() {
    background(200);
    circle(width / 2 + shifter.getShiftValue().x, height / 2 + shifter.getShiftValue().y, 100);
    circle(width / 2, height / 2, 100);
    shifter.update();
}


//frameと、現在地と目的地を入れると、それに応じて、横方向か縦方向かどちらかに動きを出力するクラス
class OrbitShifter {
    shiftType;
    frame;
    ease;
    tween;
    shiftValue;
    range;
    distance;
    roundNum;
    direction;
    sinCosDetector;

    constructor(Frame, Ease, x1, y1, x2, y2) {
        this.frame = Frame;
        this.ease = Ease;

        this.distance = this.calcDistance(x1, y1, x2, y2);//距離を算出する
        this.speed = this.frame / this.distance;//1px進むのに必要なフレーム数
        this.range = this.setRange(this.speed);//動きの幅を算出
        this.roundNum = this.setRoundNum(this.speed);//何往復するかの回数をランダムで決定
        this.direction = Math.random() < 0.5 ? -1 : 1;//angleを++するか、--するかを決めている
        this.sinCosDetector = this.calcSinCosDetector(x1, y1, x2, y2);//縦に動くか、横に動くかを判別している
        this.shiftValue = {//positionを入れる箱
            x: 0,
            y: 0,
        }

        //tweenの値を縦に動くか、横に動くかを決めている
        if (this.sinCosDetector == "sin") {
            this.tween = new neko.FrameTween([0, 0], [2 * this.roundNum * Math.PI * this.direction, 0], this.frame, this.ease);
        }
        else if(this.sinCosDetector == "cos"){
            this.tween = new neko.FrameTween([0.5* Math.PI, 0], [2 * this.roundNum * Math.PI * this.direction + 0.5 * Math.PI, 0], this.frame, this.ease);
        }
    }

    calcSinCosDetector(x1, y1, x2, y2) {
        let sinCosDetector;
        if (abs(x1 - x2) < abs(y1 - y2)) {sinCosDetector = "cos";}
        if(abs(x1 - x2) >= abs(y1 - y2)){sinCosDetector = "sin";}
        console.log(sinCosDetector);
        return sinCosDetector;
    }

    //距離を計算する
    calcDistance(x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    //sinの振れ幅は、speedによって決まる
    //ここの処理まだ未定
    setRange(Speed) {
        let range = Speed * 1000;
        console.log("反復の振れ幅は:" + range);
        return range;//sinの振り幅
    }

    //反復する回数は、speedによって決まる
    //ここの処理まだ未定
    setRoundNum(Speed) {
        let num;
        let randomRange
        randomRange = Speed * 20;
        num = Math.ceil(random(0, randomRange));
        console.log("反復する回数は:" + num);
        return num;
    }

    update() {
        this.tween.update();
        if (this.sinCosDetector == "cos") {
            this.shiftValue.x = Math.cos(this.tween.getValues()[0]) * this.range;
        }
        else if (this.sinCosDetector == "sin") {
            this.shiftValue.y = Math.sin(this.tween.getValues()[0]) * this.range;
        }
    }

    getShiftValue() {
        return this.shiftValue;
    }
}