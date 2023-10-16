import { FileList } from "./fileList/FileList";
import { Timeline } from "./timeline/Timeline";
import { EventListener } from "./eventListener/eventListener";

export class ControlManager {
    fileList;
    timeline;
    selectedMotionData;//今何のデータを選択しているか

    constructor() {
        this.timeline = new Timeline("timeline");
        this.fileList = new FileList("fileList");

        this.addMotionObject();
        this.addMotionObject();
        this.addMotionObject();
        this.addMotionObject();
        
        //イベントリスナーの設定
        this.event = new EventListener();
        this.event.add("parameterChanged");//何かしらのパラメーターが操作された瞬間に発火
        this.event.add("motionObjectSelected");//モーションオブジェクトが選択された時に発火

        this.timeline.event.add("motionObjectChanged", () => {
            this.event.dispatch("parameterChanged");
        });
        this.timeline.event.add("motionObjectClicked", (SelectedObjectNumber) => {
            this.selectedMotionData = SelectedObjectNumber;//選択しているmotionDataの更新
            this.event.dispatch("motionObjectSelected", this.selectedMotionData);
        })
        //ゲッター
        // console.log(timeline.getSelectedObjectNumber());
        //これは今どのバーが選択されているかを取り出せるintで帰ってくるよ
        // console.log(timeline.getMotionObjectFrames(0));
        //これは引数で指定したmotionObject（バー）のstartFrameとendFrameとdurationがframe変数にまとまって帰ってくる
        //取り出す時はframe.startFrameみたいな感じで取り出せる

        //セッター
        //timeline.setMotionType("MotionType");
        //stringで入れると、現在選択しているmotionObjectの動きの表示を変更できるよ
        //setMotionObjectFrames(MotionObjectNum, StartFrame, EndFrame);
        //指定したmotionObjectの動きのframeパラメーターを変更できる。
    }

    addMotionObject(){
        this.timeline.pushMotionObject();
    }
    setMotionObjectPARAMS(){

    }
}